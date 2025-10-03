import * as cheerio from "cheerio";

async function fetchCourses(dept) {
  const formData = new URLSearchParams({
    YearTerm: "2025-92",     // Fall 2025
    ShowComments: "on",
    ShowFinals: "on",
    Breadth: "ANY",
    Dept: dept,              // e.g. "I&C SCI"
    CourseNum: "139W",
    Division: "ANY",
    CourseCodes: "",
    InstrName: "",
    CourseTitle: "",
    ClassType: "ALL",
    Units: "",
    Modality: "",
    Days: "",
    StartTime: "",
    EndTime: "",
    MaxCap: "",
    FullCourses: "ANY",
    FontSize: "100",
    CancelledCourses: "Exclude",
    Bldg: "",
    Room: "",
    Submit: "Display Web Results"
  });

  // Step 1: Fetch the page
  const res = await fetch("https://www.reg.uci.edu/perl/WebSoc", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  })

  const html = await res.text();
  const $ = cheerio.load(html);

  const courses = [];
  let currentCourse = null;

  $("tr").each((_, row) => {
    const tds = $(row).find("td");

    // --- Course title row ---
    if (tds.length === 1 && $(tds[0]).find("b").length > 0) {
      const title = $(tds[0]).text().trim();
      if (title.length > 100) return
      currentCourse = { title, offerings: [] };
      courses.push(currentCourse);
    }
    // --- Offering row ---
    else if (tds.length > 5) {
      const courseCode = $(tds[0]).text().trim();
      if (/^\d+$/.test(courseCode)) {
        const type = $(tds[1]).text().trim();
        const section = $(tds[2]).text().trim();
        if (type !== 'Lec') return
        const instructor = $(tds[4]).text().trim();
        const modality = $(tds[5]).text().trim();
        const time = $(tds[6]).text().trim();
        const location = $(tds[7]).text().trim();
        const status = $(tds[16]).text().trim(); // "OPEN"/"FULL" etc.

        if (currentCourse) {
          currentCourse.offerings.push({
            courseCode,
            type,
            section,
            instructor,
            modality,
            time,
            location,
            status,
          });
        }
      }
    }
  });

  return courses;
}

// Example usage:
fetchCourses("I&C SCI").then((courses) => {
  console.log(JSON.stringify(courses, null, 2));
});

export default fetchCourses