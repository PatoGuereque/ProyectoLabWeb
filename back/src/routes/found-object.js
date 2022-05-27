import express from 'express';
import { body, validationResult } from 'express-validator';
import { foundObjectRepository } from '../database';
import { authRequired } from '../middleware/auth-required';
import { connection } from '../database/mongo';

const foundObject = express();

foundObject.get('/objects/list', async (_req, res) => {
  connection.query('SELECT * FROM objects', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  res.status(200).json({
    objects: [],
  });
});

foundObject.post(
  '/objects/create',
  body('campus').isString().notEmpty(),
  body('category').isString().notEmpty(),
  body('dateFound').isISO8601(),
  body('imageBase64').isString().notEmpty(),
  body('location').isString().notEmpty(),
  body('status').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
      return res.status(400).json({ error: 'User is not logged in' });
    }

    const { campus, category, dateFound, imageBase64, location, status } =
      req.body;

    var sqlQuery =
      'INSERT INTO objects (campus, location, category, reportingUser, imageBase64, status, dateFound, claimedBy, comments) VALUES' +
      (campus,
      location,
      category,
      reportingUser,
      imageBase64,
      status,
      dateFound,
      '',
      '');
    connection.query(sqlQuery, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
    return res.status(200).json(req.body);
  }
);

foundObject.get('/objects/get/:id', async (req, res) => {
  const objectWithId = await foundObjectRepository.getObjectWithId(
    req.params.id
  );
  res.status(200).json({
    object: objectWithId,
  });
});

foundObject.post('/objects/desactivar/:id', authRequired, async (req, res) => {
  const deactivated = await foundObjectRepository.deactivateObject(
    req.params.id,
    req.user.email
  );
  res.status(200).json({
    object: deactivated,
  });
});

export default foundObject;
