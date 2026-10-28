from uuid import UUID

import pytest
from fastapi.testclient import TestClient

from main import MAX_INQUIRIES, app, inquiries, projects


@pytest.fixture
def client():
    inquiries.clear()
    with TestClient(app) as test_client:
        yield test_client
    inquiries.clear()


def payload(**changes):
    return {
        "name": "Demo Visitor",
        "email": "visitor@example.com",
        "project_slug": "sentinel",
        "message": "How did you evaluate the failure-risk model?",
        **changes,
    }


def test_list_and_filters_do_not_modify_seed_data(client):
    assert client.get("/api/projects").json()["total"] == 3
    result = client.get(
        "/api/projects", params={"q": "SHIPMENT", "skill": " python "}
    ).json()
    assert [p["slug"] for p in result["projects"]] == ["interceptiq"]
    result = client.get("/api/projects", params={"skill": "rEaCt"}).json()
    assert [p["slug"] for p in result["projects"]] == ["focusmate"]
    assert client.get("/api/projects", params={"q": "no-such-project"}).json() == {
        "total": 0,
        "projects": [],
    }
    assert (
        client.get("/api/projects", params={"q": "shipment", "skill": "React"}).json()[
            "total"
        ]
        == 0
    )
    assert len(projects) == 3


@pytest.mark.parametrize(
    "params",
    [{"q": ""}, {"q": "   "}, {"q": "x" * 101}, {"skill": " "}, {"skill": "x" * 51}],
)
def test_invalid_filters(client, params):
    assert client.get("/api/projects", params=params).status_code == 422


@pytest.mark.parametrize("slug", ["sentinel", "interceptiq", "focusmate"])
def test_get_each_project(client, slug):
    result = client.get(f"/api/projects/{slug}")
    assert result.status_code == 200
    assert result.json()["slug"] == slug
    assert result.json()["github"].startswith("https://github.com/NRao0158/")


def test_unknown_project(client):
    result = client.get("/api/projects/missing")
    assert result.status_code == 404
    assert result.json() == {"detail": "Project not found"}


def test_inquiry_is_saved_with_unique_id_without_exposing_private_fields(client):
    first = client.post("/api/inquiries", json=payload(name="  Demo Visitor  "))
    second = client.post("/api/inquiries", json=payload())
    assert first.status_code == second.status_code == 201
    assert UUID(first.json()["id"]) != UUID(second.json()["id"])
    assert len(inquiries) == 2
    assert inquiries[0].name == "Demo Visitor"
    assert inquiries[0].message == payload()["message"]
    assert str(inquiries[0].id) == first.json()["id"]
    assert inquiries[0].created_at.tzinfo is not None
    assert "email" not in first.json() and "name" not in first.json()
    assert first.headers["cache-control"] == "no-store"
    assert "temporary memory" in first.json()["message"]
    assert client.get("/api/inquiries").status_code == 405


@pytest.mark.parametrize(
    "changes",
    [
        {"name": " "},
        {"email": "invalid"},
        {"message": "short"},
        {"message": " " * 20},
        {"message": "x" * 2001},
        {"project_slug": ""},
        {"extra": "unexpected"},
    ],
)
def test_invalid_inquiry_is_not_saved(client, changes):
    assert client.post("/api/inquiries", json=payload(**changes)).status_code == 422
    assert inquiries == []


def test_unknown_inquiry_project_is_not_saved(client):
    assert (
        client.post("/api/inquiries", json=payload(project_slug="missing")).status_code
        == 404
    )
    assert inquiries == []


def test_capacity_is_bounded(client):
    client.post("/api/inquiries", json=payload())
    inquiries.extend([inquiries[0]] * (MAX_INQUIRIES - 1))
    assert client.post("/api/inquiries", json=payload()).status_code == 503
    assert len(inquiries) == MAX_INQUIRIES


def test_three_documented_endpoints_and_interactive_docs(client):
    schema = client.get("/api/openapi.json").json()
    assert set(schema["paths"]) == {
        "/api/projects",
        "/api/projects/{slug}",
        "/api/inquiries",
    }
    assert client.get("/api/docs").status_code == 200
    assert client.post("/api/projects").status_code == 405
