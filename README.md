# UrbanFlow AI

> **AI-powered Traffic Congestion Prediction & Simulation Platform**
> Designed for Indian cities — Bengaluru, Hyderabad, and Chennai.

![License](https://img.shields.io/badge/license-MIT-blue)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript%20%2B%20Tailwind-blue)
![Backend](https://img.shields.io/badge/backend-Python%20FastAPI-green)
![ML](https://img.shields.io/badge/ML-Scikit--learn-orange)
![Status](https://img.shields.io/badge/status-Prototype%20%E2%80%94%20Demo%20Data-amber)

---

> ⚠️ **Important Disclaimer:** UrbanFlow AI is a **research and demonstration platform**. All predictions, statistics, and recommendations are **model-generated simulations** using **synthetic data**. They do not represent real-time traffic conditions and should not be treated as authoritative instructions for real-world traffic control.

---

## 📸 Screenshots / Demo

> **Recruiter Demo:** Click the "🎯 Recruiter Demo" button on the landing page for an auto-loaded 2-minute guided tour of all features.

| Page | Description |
|------|-------------|
| Landing Page | Hero, features, how it works |
| Dashboard | KPI cards, 24hr trend chart, incidents |
| Live Traffic Map | Interactive Leaflet map with junction markers |
| Predictions | Congestion probability + Explainable AI |
| What-If Simulator | Scenario comparison with charts |
| Incidents | Incident management |
| Analytics | Hourly/weekly charts, peak analysis |
| High-Risk Junctions | Sortable risk junction cards |
| Public View | Simple route/travel time lookup |

---

## 🚀 Features

- **🗺️ Interactive Traffic Map** — Leaflet-based map with color-coded congestion (green/yellow/orange/red). Click any junction for a detailed side panel.
- **📈 Congestion Prediction** — ML-based forecasting up to 120 minutes ahead with probability scores and confidence intervals.
- **🧠 Explainable AI** — Factor breakdown charts showing *why* congestion is predicted (volume, bottleneck, capacity, weather, historical pattern).
- **⚡ What-If Simulator** — Adjust signal timing, lanes, diversion %, weather, and see simulated before/after comparison.
- **🚨 Incident Management** — Report and track accidents, construction, waterlogging, events with severity and impact radius.
- **📊 Traffic Analytics** — Hourly, daily, weekly pattern charts with filters by city, road, and date range.
- **🏙️ High-Risk Junctions** — Sortable cards showing congestion frequency, average delay, and contributing factors.
- **💡 AI Recommendations** — Action suggestions with expected impact, confidence scores, and simulation results.
- **👥 Role-Based Access** — Admin, Traffic Analyst, Researcher, Public User.
- **🌐 Public View** — Simplified destination lookup for general users.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| Vite | 5.x | Build tool |
| React Router | 6.x | Routing |
| React-Leaflet | 4.x | Interactive maps |
| Recharts | 2.x | Data charts |
| Zustand | 4.x | State management |
| Lucide React | latest | Icons |
| Axios | 1.x | API client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python FastAPI | 0.104.x | REST API |
| SQLAlchemy | 2.x | ORM |
| SQLite / PostgreSQL | — | Database |
| Pydantic | 2.x | Schema validation |
| Uvicorn | 0.24.x | ASGI server |
| Python-JOSE | 3.x | JWT authentication |
| Passlib | 1.7.x | Password hashing |

### AI / ML Layer
| Technology | Purpose |
|------------|---------|
| Scikit-learn | RandomForest prediction model |
| NumPy | Numerical computing |
| Pandas | Data processing |
| Custom Simulator | Rule-based what-if engine |
| Feature Attribution | SHAP-style factor breakdown |

---

## 📁 Project Structure

```
UrbanFlow-AI/
├── frontend/                    # React + TypeScript + Tailwind CSS
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/          # Recharts wrappers
│   │   │   ├── layout/          # AppLayout, Header, Sidebar
│   │   │   ├── map/             # Leaflet map + JunctionPanel
│   │   │   └── ui/              # StatCard, DemoBanner, PageHeader
│   │   ├── data/                # Synthetic demo dataset (TypeScript)
│   │   ├── pages/               # All route-level pages
│   │   ├── services/            # Axios API layer
│   │   ├── store/               # Zustand global state
│   │   ├── types/               # TypeScript interfaces
│   │   └── utils/               # Helper functions
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                     # Python FastAPI
│   ├── app/
│   │   ├── main.py              # FastAPI app + CORS + lifespan
│   │   ├── config.py            # Settings (pydantic-settings)
│   │   ├── database.py          # SQLAlchemy async setup
│   │   ├── api/routes/          # Auth, Traffic, Predictions, Simulation, Incidents, Analytics
│   │   ├── models/              # SQLAlchemy models
│   │   ├── schemas/             # Pydantic request/response schemas
│   │   ├── services/            # Business logic
│   │   └── ml/                  # Predictor, Simulator, Explainer
│   ├── data/
│   │   └── sample_traffic_data.csv
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## ⚡ Installation & Setup

### Prerequisites
- **Node.js** ≥ 18.x
- **Python** ≥ 3.11
- **npm** or **yarn**

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/UrbanFlow-AI.git
cd UrbanFlow-AI
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**

To build for production:
```bash
npm run build
```

---

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
copy .env.example .env    # Windows
# cp .env.example .env    # macOS/Linux

# Start the server
python run.py
```

Backend runs at: **http://localhost:8000**

API Documentation at: **http://localhost:8000/docs**

---

### 4. Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| 🎯 Recruiter Demo | `recruiter@urbanflow.ai` | `recruit123` |
| 🔧 Traffic Analyst | `demo@urbanflow.ai` | `demo123` |
| ⚙️ Admin | `admin@urbanflow.ai` | `admin123` |

Or click **"🎯 Recruiter Demo"** on the landing page for an auto-login demo.

---

## 🗺️ Usage

### Dashboard
- View real-time KPI cards (congestion %, travel time, speed, incidents)
- Monitor the 24-hour traffic trend chart
- See AI recommendations at a glance

### Live Traffic Map
1. Select a city (Bengaluru / Hyderabad / Chennai)
2. View color-coded junction markers on the interactive map
3. Click any junction to open the detail panel

### Predictions
1. Select city, road, junction, date, time, day, weather, volume
2. Click **"Run Prediction"**
3. View probability gauge, 120-minute forecast chart
4. Explore the Explainable AI factor breakdown

### What-If Simulator
1. Adjust sliders (signal timing, lanes, diversion %, volume)
2. Click **"Run Simulation"**
3. Compare Current vs Proposed scenarios side by side

### Incidents
1. Click **"Report Incident"**
2. Fill in type, location, severity, description
3. Manage status (Active → Monitoring → Resolved)

---

## 🔌 API Documentation

Full interactive API docs available at `http://localhost:8000/docs` (Swagger UI).

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login and get JWT token |
| `POST` | `/api/auth/register` | Register new user |
| `GET` | `/api/traffic/live` | Get all junction traffic data |
| `GET` | `/api/traffic/junction/{id}` | Get junction detail |
| `POST` | `/api/predictions/predict` | Run ML congestion prediction |
| `POST` | `/api/simulation/run` | Run what-if simulation |
| `GET` | `/api/incidents/` | List incidents |
| `POST` | `/api/incidents/` | Create incident |
| `PATCH` | `/api/incidents/{id}` | Update incident status |
| `GET` | `/api/analytics/hourly` | Hourly traffic data |
| `GET` | `/api/analytics/weekly` | Weekly patterns |
| `GET` | `/api/analytics/peak-hours` | Peak hour analysis |

---

## 🗃️ Sample Dataset

Location: `backend/data/sample_traffic_data.csv`

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | datetime | Data collection time |
| `city` | string | Bengaluru / Hyderabad / Chennai |
| `road` | string | Road name |
| `junction` | string | Junction name |
| `vehicle_count` | int | Vehicles per hour |
| `average_speed` | float | km/h |
| `queue_length` | float | Metres |
| `weather` | string | Clear / Rain / Fog etc. |
| `incident` | string | Incident type (nullable) |
| `lane_count` | int | Number of lanes |
| `signal_cycle` | int | Signal cycle duration (seconds) |
| `congestion_level` | string | low / moderate / high / severe |
| `data_type` | string | Always "simulated" |

---

## 🚀 Future Improvements

- [ ] Real-time traffic API integration (TomTom, Google Maps, HERE)
- [ ] CCTV computer vision vehicle counting
- [ ] Emergency vehicle priority signal control
- [ ] IoT sensor data ingestion
- [ ] Weather API integration (OpenWeatherMap)
- [ ] Government traffic feed connectors (ITMS, ATCS)
- [ ] GPS probe vehicle data
- [ ] Advanced ML models (LSTM, Transformer-based forecasting)
- [ ] Edge computing deployment for low-latency inference
- [ ] Mobile app (React Native)
- [ ] WebSocket real-time updates
- [ ] Docker containerization
- [ ] Kubernetes deployment configs
- [ ] CI/CD pipeline (GitHub Actions)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│           React Frontend                │
│  (TypeScript + Tailwind + Recharts +    │
│   React-Leaflet + Zustand)              │
└──────────────────┬──────────────────────┘
                   │ REST API (Axios)
                   ▼
┌─────────────────────────────────────────┐
│         FastAPI Backend                 │
│  ┌────────────┐  ┌────────────────────┐ │
│  │   Routes   │  │   ML Layer         │ │
│  │  Auth      │  │  Predictor         │ │
│  │  Traffic   │  │  Simulator         │ │
│  │  Predict   │  │  Explainer         │ │
│  │  Simulate  │  └────────────────────┘ │
│  │  Incidents │                         │
│  │  Analytics │  ┌────────────────────┐ │
│  └────────────┘  │   Database         │ │
│                  │  SQLite (dev)       │ │
│                  │  PostgreSQL (prod)  │ │
│                  └────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- **OpenStreetMap** — Free map tiles (no API key required)
- **Recharts** — Beautiful React chart library
- **React-Leaflet** — React bindings for Leaflet maps
- **Tailwind CSS** — Utility-first CSS framework
- **FastAPI** — High-performance Python web framework
- **Scikit-learn** — ML library for the prediction engine

---

*Built as a portfolio project demonstrating: Software Engineering + AI/ML + Data Analytics + REST APIs + Interactive Maps + Simulation + Professional UI/UX*
