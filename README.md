# Tier-Based Event Showcase

A responsive Next.js 14 application that allows authenticated users to view events based on their membership tier (**Free, Silver, Gold, Platinum**).  
Events are fetched from Supabase and filtered so that a user can only see events available to their tier or any lower tier.  
Authentication is handled by Clerk, and styling is done with Tailwind CSS.



##  Features

- **Authentication** with Clerk.dev (Login / Signup)
- **Tier-based event filtering** (Free → Silver → Gold → Platinum)
- **Supabase** PostgreSQL database for storing events
- **Responsive UI** with Tailwind CSS
- **Tier badges** (color-coded by level)
- **Locked event messages** for higher-tier events
- Loading and error handling states



##  Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel




## ⚙️ Setup Instructions

1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies
Make sure you have **Node.js 18+** installed.  
Then install all project dependencies:

```bash
npm install
```

### 3️⃣ Create and Configure .env.local
In the root of your project, create a .env.local file and add:


```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
```

### 4️⃣ Set Up Supabase Database
In your Supabase dashboard, create a table named events with the following schema:

| Column       | Type                  | Constraints                                             |
|--------------|-----------------------|---------------------------------------------------------|
| id           | uuid                  | Primary key, Default: `gen_random_uuid()`               |
| title        | text                  | Required                                                |
| description  | text                  | Required                                                |
| event_date   | timestamp with tz     | Required                                                |
| image_url    | text                  | Required                                                |
| tier         | text / enum           | Allowed values: `free`, `silver`, `gold`, `platinum`    |


### Seed your table with sample events:

```sql
INSERT INTO events (id, title, description, event_date, image_url, tier)
VALUES
-- Free tier events
(gen_random_uuid(), 'Free Coding Bootcamp', 'A beginner-friendly coding bootcamp to learn HTML, CSS, and JavaScript.', '2025-08-05 10:00:00+00', 'https://example.com/images/free-coding.jpg', 'free'),
(gen_random_uuid(), 'Community Meetup', 'A casual meetup for tech enthusiasts in the local community.', '2025-09-12 17:00:00+00', 'https://example.com/images/community-meetup.jpg', 'free'),

-- Silver tier events
(gen_random_uuid(), 'React.js Workshop', 'An intermediate-level workshop covering React.js and hooks.', '2025-08-20 14:00:00+00', 'https://example.com/images/react-workshop.jpg', 'silver'),
(gen_random_uuid(), 'UI/UX Design Sprint', 'Hands-on design sprint for improving user experience.', '2025-09-15 09:00:00+00', 'https://example.com/images/uiux-sprint.jpg', 'silver'),

-- Gold tier events
(gen_random_uuid(), 'Advanced JavaScript Masterclass', 'Deep dive into JavaScript performance optimization and patterns.', '2025-08-25 13:00:00+00', 'https://example.com/images/js-masterclass.jpg', 'gold'),
(gen_random_uuid(), 'Database Optimization Summit', 'Best practices for optimizing PostgreSQL and Supabase databases.', '2025-09-18 11:00:00+00', 'https://example.com/images/db-optimization.jpg', 'gold'),

-- Platinum tier events
(gen_random_uuid(),'AI & Machine Learning Executive Summit', 'Exclusive insights from industry leaders on AI and machine learning advancements.', '2025-09-22 10:00:00+00', 'https://example.com/images/ai-summit.jpg', 'platinum'),
(gen_random_uuid(),'Luxury Tech Retreat', 'A premium 3-day retreat with networking, workshops, and luxury experiences for top-tier members.', '2025-10-05 09:00:00+00', 'https://example.com/images/luxury-tech-retreat.jpg', 'platinum');
```

### 5️⃣ Configure Clerk User Metadata
Go to Clerk Dashboard → Users

Select a user → Edit

Under Public Metadata, set:

```
{
  "tier": "silver"
}
```

(Change "silver" to "free", "gold", or "platinum" for different test accounts.)


### 6️⃣ Run the Development Server

```
npm run dev
```

### 7️⃣ Deploy on Vercel
Push your code to GitHub.

Go to Vercel → Import Project from GitHub.

Add your .env.local variables in Vercel → Settings → Environment Variables.

Click Deploy 


##  Demo User Credentials

| Tier      | Email                 | Password         |
|-----------|----------------------|------------------|
| Free      | free@example.com     | FreeTier@123     |
| Silver    | silver@example.com   | SilverTier@123   |
| Gold      | gold@example.com     | GoldTier@123     |
| Platinum  | platinum@example.com | PlatinumTier@123 |
