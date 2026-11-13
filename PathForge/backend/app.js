import express from 'express';
import cors from 'cors';
import pool from './server.js';

const app = express();
app.use(cors());
app.use(express.json())

app.post('/postRequest', async (req, res) => {
    const Profile = {
        credits: req.body.credits,
        courses: req.body.courses,
        career: req.body.career,
        skills: req.body.skills
    }

    Profile.courses = Profile.courses.split(",").map(course => course.trim().toUpperCase());
    const courses = Profile.courses;
    const [course_list] = await pool.query(`SELECT * FROM computer_science WHERE code IN (?)`,
        [Profile.courses]
    );
    let creds = 0;

    let categories = {
        cs_core: 0,
        senior_cs: 0,
        mathematics: 0,
        stats: 0,
        cs_related: 0,
        natural_science: 0,
        additional_mason_core: 0
    }


    for (let i = 0; i < course_list.length; i++) {
        let course = course_list[i];
        let credits = Number(course.credits);
        creds += credits; 
        for (let j in categories) {
            if (course[j] == 1) {
                categories[j] += credits;
            }
        }
    }

    res.json({
        message: 'updated degree progress',
        progress: categories,
    });
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})