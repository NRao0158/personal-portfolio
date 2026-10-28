"""Week 5 portfolio API. Lists intentionally reset when this process restarts."""

from datetime import datetime, timezone
from threading import Lock
from typing import Annotated
from uuid import UUID, uuid4

from fastapi import FastAPI, HTTPException, Query, Response, status
from pydantic import BaseModel, ConfigDict, EmailStr, Field

app = FastAPI(
    title="Nihal Rao Portfolio API",
    version="1.0.0",
    description=(
        "Week 5: three endpoints using in-memory Python lists. "
        "Inquiries are a classroom demo, are not emailed, and are not durable. "
        "Do not submit confidential information."
    ),
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
)


class Project(BaseModel):
    slug: str
    title: str
    category: str
    summary: str
    stack: list[str]
    github: str
    demo: str | None = None
    disclaimer: str


class ProjectResults(BaseModel):
    total: int
    projects: list[Project]


class InquiryCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    name: str = Field(min_length=1, max_length=80, description="Sender's name")
    email: EmailStr = Field(max_length=254, description="Sender's reply address")
    project_slug: str = Field(
        min_length=1, max_length=50, description="A known project slug"
    )
    message: str = Field(
        min_length=10, max_length=2000, description="A project question; demo only"
    )


class Inquiry(InquiryCreate):
    id: UUID
    created_at: datetime


class InquiryReceipt(BaseModel):
    id: UUID
    project_slug: str
    created_at: datetime
    status: str = "accepted"
    message: str = "Saved in temporary memory only. This demo does not send email."


class APIError(BaseModel):
    detail: str


# Public project facts are a snapshot of frontend/src/data/projects.ts.
# The React frontend does not call these endpoints, per the assignment.
projects: list[Project] = [
    Project(
        **{
            "slug": "sentinel",
            "title": "Sentinel",
            "category": "Predictive maintenance · Machine learning",
            "summary": "A machine-learning system for predicting failure within 30 operating cycles and estimating remaining useful life from NASA C-MAPSS simulated turbofan telemetry. Built around causal features, machine-disjoint evaluation, reproducibility, and leakage-aware testing.",
            "stack": ["Python", "scikit-learn", "pandas", "Streamlit"],
            "github": "https://github.com/NRao0158/sentinel-predictive-maintenance",
            "demo": "https://nihal-sentinel.streamlit.app/",
            "disclaimer": "Independent portfolio project using NASA C-MAPSS simulated turbofan data.",
        }
    ),
    Project(
        **{
            "slug": "interceptiq",
            "title": "InterceptIQ",
            "category": "Machine learning · Backend systems",
            "summary": "A machine-learning and backend system for identifying simulated packages at risk of moving while under HOLD or REJECT and detecting stop violations as shipment, screening, and brokerage events arrive.",
            "stack": ["Python", "FastAPI", "PostgreSQL", "RabbitMQ", "Streamlit"],
            "github": "https://github.com/NRao0158/interceptiq-shipment-risk",
            "demo": "https://nihal-interceptiq.streamlit.app/",
            "disclaimer": "All shipment data and operational scenarios are synthetic.",
        }
    ),
    Project(
        **{
            "slug": "focusmate",
            "title": "FocusMate",
            "category": "Computer vision · Accessibility",
            "summary": "A full-stack study prototype that uses face presence as a rough proxy for attention. A React client sends webcam images to a Flask-SocketIO backend for OpenCV face detection and displays a dismissible blur overlay when no face is detected.",
            "stack": ["React", "Python", "OpenCV", "Flask", "Socket.IO", "Figma"],
            "github": "https://github.com/NRao0158/focusmate-ai",
            "disclaimer": "Portfolio accessibility project; not a clinically validated treatment or medical device.",
        }
    ),
]
inquiries: list[Inquiry] = []
inquiry_lock = Lock()
MAX_INQUIRIES = 500


@app.get("/api/projects", response_model=ProjectResults, tags=["Projects"])
def list_projects(
    q: Annotated[
        str | None,
        Query(
            min_length=1,
            max_length=100,
            pattern=r"\S",
            description="Case-insensitive title, category, summary, or skill search",
        ),
    ] = None,
    skill: Annotated[
        str | None,
        Query(
            min_length=1,
            max_length=50,
            pattern=r"\S",
            description="Case-insensitive exact technology name, e.g. Python",
        ),
    ] = None,
) -> ProjectResults:
    """Retrieve projects from the list; combine optional filters with AND. No matches returns 200 and an empty list; invalid parameters return 422."""
    results = projects
    if q is not None:
        term = q.strip().casefold()
        results = [
            p
            for p in results
            if term in " ".join([p.title, p.category, p.summary, *p.stack]).casefold()
        ]
    if skill is not None:
        term = skill.strip().casefold()
        results = [
            p for p in results if any(term == item.casefold() for item in p.stack)
        ]
    return ProjectResults(total=len(results), projects=results)


@app.get(
    "/api/projects/{slug}",
    response_model=Project,
    responses={404: {"model": APIError, "description": "Unknown project slug"}},
    tags=["Projects"],
)
def get_project(slug: str) -> Project:
    """Find one project in the list by its slug (sentinel, interceptiq, or focusmate)."""
    for project in projects:
        if project.slug == slug:
            return project
    raise HTTPException(status_code=404, detail="Project not found")


@app.post(
    "/api/inquiries",
    response_model=InquiryReceipt,
    status_code=status.HTTP_201_CREATED,
    responses={
        404: {"model": APIError, "description": "Unknown project slug"},
        503: {"model": APIError, "description": "Temporary inquiry list is full"},
    },
    tags=["Inquiries"],
)
def create_inquiry(submission: InquiryCreate, response: Response) -> InquiryReceipt:
    """Validate a project inquiry and append an Inquiry object to the in-memory list. Invalid JSON fields return 422. This does not send email."""
    get_project(submission.project_slug)
    with inquiry_lock:
        if len(inquiries) >= MAX_INQUIRIES:
            raise HTTPException(
                status_code=503,
                detail="Demo inquiry capacity reached; please use the portfolio email link",
            )
        inquiry = Inquiry(
            **submission.model_dump(), id=uuid4(), created_at=datetime.now(timezone.utc)
        )
        inquiries.append(inquiry)
    response.headers["Cache-Control"] = "no-store"
    return InquiryReceipt(
        id=inquiry.id, project_slug=inquiry.project_slug, created_at=inquiry.created_at
    )
