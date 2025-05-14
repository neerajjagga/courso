import express, { Router } from 'express';
import {
    checkAuth,
    checkInstructor
} from '../middlewares/user.middleware.js';
import { validateModuleData, validateModuleUpdateData } from '../middlewares/module.middleware.js';
import {
    createModule,
    getModules,
    updateModule,
    deleteModule
} from '../controllers/module.controller.js';

const moduleRouter: Router = express.Router();

// create module
moduleRouter.post('/', checkAuth, checkInstructor, validateModuleData, createModule);

// get modules of specific course
moduleRouter.get('/:courseId', checkAuth, checkInstructor, getModules);

// edit module (title, order) 
moduleRouter.patch('/:moduleId', checkAuth, checkInstructor, validateModuleUpdateData, updateModule);

// delete module
moduleRouter.delete('/:moduleId', checkAuth, checkInstructor, deleteModule);

export default moduleRouter;