# Supabase Integration & API Setup Guide

## Overview
The application has been consolidated to use **Supabase as the primary database** with backend API endpoints serving all data to the frontend.

---

## Changes Made

### 1. **Supabase Schema Updates** (`supabase_schema.sql`)

#### New Table: `exams`
```sql
CREATE TABLE public.exams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    exam_date DATE,
    result_date DATE,
    status TEXT DEFAULT 'Upcoming',
    website TEXT,
    created_at TIMESTAMP...
)
```

**Seeded with:**
- JEE Main, JEE Advanced
- NEET UG
- CLAT, CUET
- CAT, UCEED, NIFT, NATA, NDA, IPMAT

#### Existing Tables
- `colleges` - All college data with metadata
- `prep_courses` - Linked to exams via `exam_id`
- `consultancy_notifications` - Email signups for consultation service

---

### 2. **Backend Setup**

#### New Files Created

**`backend/supabaseClient.js`** - Supabase client initialization
```javascript
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);
```

**`backend/controllers/collegeControllerSupabase.js`**
- `getColleges()` - Fetch all colleges
- `getCollegeById(id)` - Fetch single college
- `getCollegesByType(type)` - Filter by type
- `createCollege()`, `updateCollege()`, `deleteCollege()`

**`backend/controllers/examControllerSupabase.js`**
- `getExams()` - Fetch all exams
- `getExamById(id)` - Fetch single exam
- `getExamsByCategory(category)` - Filter by category
- `getPrepCourses(examId)` - Get courses for an exam
- `createExam()`, `updateExam()`, `deleteExam()`

**`backend/controllers/prepCoursesControllerSupabase.js`**
- `getPrepCourses()` - Fetch all prep courses
- `getPrepCoursesByExam(examId)` - Courses for specific exam
- `getPrepCoursesByProvider()` - Filter by YouTube/Udemy
- `getPrepCoursesByType()` - Filter by Free/Paid
- Create, Update, Delete operations

#### Updated Files

**`backend/routes/api.js`** - New endpoints added:
```
GET    /colleges                     - All colleges
GET    /colleges/:id                 - Single college
GET    /colleges/type/:type          - Colleges by type
POST   /colleges                     - Create college (admin)
PUT    /colleges/:id                 - Update college (admin)
DELETE /colleges/:id                 - Delete college (admin)

GET    /exams                        - All exams
GET    /exams/:id                    - Single exam
GET    /exams/category/:category     - Exams by category
GET    /exams/:id/prep-courses       - Courses for exam
POST   /exams                        - Create exam (admin)
PUT    /exams/:id                    - Update exam (admin)
DELETE /exams/:id                    - Delete exam (admin)

GET    /prep-courses                 - All prep courses
GET    /prep-courses/exam/:examId    - Courses by exam
GET    /prep-courses/provider        - Courses by provider
GET    /prep-courses/type            - Courses by type
POST   /prep-courses                 - Create course (admin)
PUT    /prep-courses/:id             - Update course (admin)
DELETE /prep-courses/:id             - Delete course (admin)
```

---

### 3. **Frontend Setup**

#### New/Updated API Service (`frontend/src/services/api.js`)

**College Endpoints:**
```javascript
api.getColleges()
api.getCollegeById(id)
api.getCollegesByType(type)
api.createCollege(data)
api.updateCollege(id, data)
api.deleteCollege(id)
```

**Exam Endpoints:**
```javascript
api.getExams()
api.getExamById(id)
api.getExamsByCategory(category)
api.getPrepCourses(examId)
api.createExam(data)
api.updateExam(id, data)
api.deleteExam(id)
```

**Prep Courses Endpoints:**
```javascript
api.getAllPrepCourses()
api.getPrepCoursesByExam(examId)
api.getPrepCoursesByProvider(provider)
api.getPrepCoursesByType(type)
api.createPrepCourse(data)
api.updatePrepCourse(id, data)
api.deletePrepCourse(id)
```

#### Updated Pages

**`frontend/src/pages/CompareColleges.js`**
- ✅ Removed hard-coded `collegesData` 
- ✅ Removed hard-coded `collegeCourses`
- ✅ Added `api.getColleges()` in useEffect
- ✅ Added `api.getAllPrepCourses()` in useEffect
- ✅ Fetches real data from Supabase via API
- ✅ Fixed YouTube import (added to lucide imports)

**`frontend/src/pages/ExamDates.js`**
- ✅ Removed hard-coded `examsData`
- ✅ Removed hard-coded `localPrepCourses`
- ✅ Added `api.getExams()` in useEffect
- ✅ Transforms API response to match component structure
- ✅ Gracefully handles loading states

**`frontend/src/pages/GetConsultancy.js`**
- ✅ Already correctly implemented
- ✅ Inserts emails into `consultancy_notifications` table
- ✅ Handles unique constraint errors gracefully
- ✅ Shows success message after signup

---

## Environment Variables

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
MONGODB_URI=mongodb_connection_string (for legacy user data)
```

### Frontend (.env)
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=/api
```

---

## Database Flow

```
┌─────────────────────────────────────────┐
│       Supabase (Cloud Database)         │
├─────────────────────────────────────────┤
│  • colleges                             │
│  • exams                                │
│  • prep_courses                         │
│  • consultancy_notifications            │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│   Backend API (Node/Express)            │
├─────────────────────────────────────────┤
│  GET  /colleges       /exams /prep...   │
│  POST /colleges       /exams /prep...   │
│  PUT  /colleges/:id   /exams/:id        │
│  DEL  /colleges/:id   /exams/:id        │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│     Frontend (React)                    │
├─────────────────────────────────────────┤
│  • CompareColleges.js                   │
│  • ExamDates.js                         │
│  • GetConsultancy.js                    │
│  • Other pages...                       │
└─────────────────────────────────────────┘
```

---

## Data Transformation

### Colleges (API → Component)
```javascript
// From Supabase
{ id, name, type, state, icon, fees, avg_package, exams, streams, ... }

// Used directly in component
collegeData.avgPackage // maps to avg_package
collegeData.campusLife  // maps to campus_life
```

### Exams (API → Component)
```javascript
// From Supabase
{ id, name, category, description, exam_date, result_date, status, website }

// Transformed in ExamDates.js
{ id, name, category, description, examDate, resultDate, status, website }
```

### Prep Courses
```javascript
// From Supabase
{ id, exam_id, title, provider, url, instructor, type, rating }

// Used directly in components
```

---

## Testing the Integration

### 1. Test Colleges Endpoint
```bash
curl http://localhost:5000/api/colleges
```

Expected response:
```json
[
  {
    "id": "iit-bombay",
    "name": "IIT Bombay",
    "type": "Engineering",
    ...
  }
]
```

### 2. Test Exams Endpoint
```bash
curl http://localhost:5000/api/exams
```

### 3. Test Prep Courses
```bash
curl http://localhost:5000/api/prep-courses
curl http://localhost:5000/api/prep-courses/exam/jee-main
```

### 4. Test Frontend Pages
- Navigate to Compare Colleges - should load data from API
- Navigate to Exam Dates - should load exams from API
- Navigate to Get Consultancy - should allow email signup

---

## Migration from Hard-coded Data

### What Changed
- ❌ Hard-coded arrays in component files
- ✅ Dynamic API calls from backend
- ✅ Data fetched from Supabase
- ✅ Centralized data management

### Backward Compatibility
- Legacy MongoDB routes still available
- User endpoints unchanged
- Frontend gracefully handles empty states

---

## Future Enhancements

1. **Caching** - Add Redis caching for frequently accessed data
2. **Pagination** - Implement pagination for large datasets
3. **Search** - Add full-text search on Supabase
4. **Filtering** - Enhanced filtering on multiple fields
5. **Real-time** - Use Supabase subscriptions for live updates
6. **Admin Panel** - Create UI for managing colleges/exams/courses

---

## Troubleshooting

### Colleges Not Loading
- Check backend logs: `npm run dev` in backend folder
- Verify Supabase tables exist and have RLS policies
- Check environment variables are set correctly

### Exams Not Showing
- Ensure `exams` table exists in Supabase
- Verify `exam_date` and `result_date` are in correct format
- Check API endpoint: `GET /api/exams`

### API Returns Empty Array
- Run Supabase schema script in SQL editor
- Verify seed data was inserted
- Check Supabase RLS policies allow public read

---

## Notes
- All controllers use try/catch error handling
- API returns 404 for missing resources
- 500 errors logged to console
- Frontend has loading states to handle async data
