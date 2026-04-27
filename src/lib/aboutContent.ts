import heroAcademics from "@/assets/hero-academics.jpg";
import heroAdmissions from "@/assets/hero-admissions.jpg";
import heroCalendar from "@/assets/hero-calendar.jpg";
import heroContact from "@/assets/hero-contact.jpg";
import heroHome from "@/assets/hero-home.jpg";
import schoolHome from "@/assets/schoolhome.png";

export interface AboutFacility {
  title: string;
  desc: string;
  image: string;
}

const ABOUT_FACILITIES_STORAGE_KEY = "vidyalaya-about-facilities";

export const defaultFacilities: AboutFacility[] = [
  { title: "Smart Classrooms", desc: "Interactive boards, projectors and high-speed internet in every room.", image: heroAcademics },
  { title: "Science & Tech Labs", desc: "State-of-the-art physics, chemistry, biology and computer labs.", image: heroAdmissions },
  { title: "Sports Complex", desc: "Olympic-standard facilities for cricket, badminton, kabaddi and yoga.", image: heroHome },
  { title: "Digital Library", desc: "50,000+ books, digital archives and e-learning resources.", image: heroCalendar },
  { title: "Auditorium", desc: "3000-seat capacity venue with sound system for events and performances.", image: heroContact },
  { title: "Cafeteria", desc: "Nutritious meals prepared fresh daily following health guidelines.", image: schoolHome },
];

export const loadAboutFacilities = (): AboutFacility[] => {
  if (typeof window === "undefined") {
    return defaultFacilities;
  }

  const raw = localStorage.getItem(ABOUT_FACILITIES_STORAGE_KEY);
  if (!raw) {
    return defaultFacilities;
  }

  try {
    const parsed = JSON.parse(raw) as AboutFacility[];
    const sanitized = parsed.filter((facility) =>
      facility &&
      typeof facility.title === "string" &&
      typeof facility.desc === "string" &&
      typeof facility.image === "string" &&
      facility.title.trim().length > 0,
    );

    return sanitized.length > 0 ? sanitized : defaultFacilities;
  } catch {
    return defaultFacilities;
  }
};

export const saveAboutFacilities = (facilities: AboutFacility[]) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ABOUT_FACILITIES_STORAGE_KEY, JSON.stringify(facilities));
};
