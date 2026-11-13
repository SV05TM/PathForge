import express from 'express';
import cors from 'cors';
import pool from './server.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

const app = express();
app.use(cors());
app.use(express.json())

app.post('/api/profile', async (req, res) => {
    const input = req.body?.courses;
    const courses = typeof input === "string"
        ? [...new Set(input.split(",")
            .map(course => course.trim().toUpperCase().replace(/\s+/g, " "))
            .filter(Boolean))]
        : [];

    if (courses.length === 0) {
        return res.status(400).json({
            error: "Enter at least one completed course, such as CS 112."
        });
    }

    const [course_list] = await pool.query(
        "SELECT * FROM computer_science WHERE code IN (?)",
        [courses]
    );

    const matchedCodes = new Set(course_list.map(course => course.code));
    const unknownCourses = courses.filter(code => !matchedCodes.has(code));

    if (course_list.length === 0) {
        return res.status(422).json({
            error: `No courses matched the PathForge catalog. Check: ${unknownCourses.join(", ")}.`
        });
    }
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
    message: "updated degree progress",
    progress: categories,
    unknownCourses
});
})

const transcriptFolder = new URL('../../uploads/', import.meta.url);

app.post(
    '/api/transcripts',
    express.raw({ type: 'application/pdf', limit: '10mb' }),
    async (req, res) => {
        const pdf = req.body;

        if (!Buffer.isBuffer(pdf) ||
            pdf.subarray(0, 5).toString('ascii') !== '%PDF-') {
            return res.status(400).json({ error: 'Select a PDF file.' });
        }

        try {
            const id = randomUUID();
            await mkdir(transcriptFolder, { recursive: true });
            await writeFile(new URL(`${id}.pdf`, transcriptFolder), pdf, {
                flag: 'wx'
            });

            return res.status(201).json({ id, message: 'Transcript saved.' });
        } catch (error) {
            console.error('Transcript save failed:', error.message);
            return res.status(500).json({ error: 'Could not save the transcript.' });
        }
    }
);


app.listen(3000, () => {
    console.log("Server running on port 3000");
})
