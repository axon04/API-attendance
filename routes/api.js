/**
 * 
 * GET ('/records/:date/:code')
 * -----------------------------
 * Fetch all documents from records with specified date and code
 * 
 * Example: localhost:8080/records/2024-03-01/MCAN-201
 *-------------------------------
 *
 *
 * GET ('/students/:code')
 * -----------------------------
 * Fetch all students with details and attendance for specified code
 * 
 * Example: localhost:8080/students/MCAN-E205E
 */

import Express from "express";
const router = Express.Router();
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;

import fetchRecord from "../controllers/fetchRecord.js";
import fetchStudent from "../controllers/fetchStudent.js";

router.route('/records/:date/:code')
    .get(fetchRecord);

router.route('/students/:code')
    .get(fetchStudent);

export default router;