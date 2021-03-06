import { Request, Response } from "express";
import * as i18n from "i18n";
import { getRepository } from "typeorm";
import { Assignment } from "../entity/Assignment";

class AssignmentsController {
    public static listAll = async (req: Request, res: Response) => {
        const assignmentRepository = getRepository(Assignment);
        const assignments = await assignmentRepository.find();
        res.send(assignments);
    }

    public static getAssignment = async (req: Request, res: Response) => {
        const assignmentRepository = getRepository(Assignment);
        const assignment = await assignmentRepository.findOne(req.params.id);
        res.send(assignment);
    }

    public static newAssignment = async (req: Request, res: Response) => {
        const { title, content } = req.body;
        if (!(title && content)) {
            res.status(400).send({ message: i18n.__("errors.notAllFieldsProvided") });
            return;
        }

        const assignment = new Assignment();
        assignment.title = title;
        assignment.content = content;

        const assignmentRepository = getRepository(Assignment);

        try {
            await assignmentRepository.save(assignment);
        } catch (e) {
            res.status(500).send({ message: i18n.__("errors.unknown") });
            return;
        }
        res.status(200).send({ success: true });
    }

    /*
    public static editAssignment = async (req: Request, res: Response) => {
        const id = req.params.id;

        const { name, role, grade } = req.body;

        const assignmentRepository = getRepository(Assignment);
        const gradeRepository = getRepository(Grade);
        let assignment;
        try {
            assignment = await assignmentRepository.findOne(id);
        } catch (error) {
            res.status(404).send({ message: i18n.__("errors.assignmentNotFound") });
            return;
            return;
        }

        if (!(name && role && grade)) {
            res.status(400).send({ message: i18n.__("errors.notAllFieldsProvided") });
            return;
        }

        assignment.assignmentname = name;
        assignment.role = role;
        assignment.grade = await gradeRepository.findOne(grade);

        try {
            await assignmentRepository.save(assignment);
        } catch (e) {
            res.status(409).send({ message: i18n.__("errors.existingAssignmentname") });
            return;
        }

        res.status(200).send({ success: true });
    }
*/
    public static deleteAssignment = async (req: Request, res: Response) => {

        const id = req.params.id;

        const assignmentRepository = getRepository(Assignment);
        try {
            await assignmentRepository.delete(id);
        } catch (e) {
            res.status(500).send({ message: i18n.__("errors.errorWhileDeletingAssignment") });
            return;
        }

        res.status(200).send({ success: true });
    }
}

export default AssignmentsController;
