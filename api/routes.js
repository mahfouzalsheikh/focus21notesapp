// Defines API routes and links to controller
import express from 'express';
import notesCtrl from './controllers/notes';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send(`
    <div>
    <p>
      Welcome to the Notes API, nothing to see here specifically.
    </p>

    <p>Please use the API methods:</p>
      <ul>
        <li>/api/notes - GET : Retrieve a list of latest notes, optionally pass limit and order GET params</li>
        <li>/api/notes/create - POST: Create a note</li>
        <li>/api/notes/<id> - GET: Retrieve a note</li>
        <li>/api/notes/<id> - PUT: Update a note</li>
        <li>/api/notes/<id> - DELETE: Removes a note</li>
      </ul>
    </div>
    `);
});

apiRouter.get('/notes', notesCtrl.list);
apiRouter.post('/notes/create', notesCtrl.create);
apiRouter.get('/notes/:id', notesCtrl.read);
apiRouter.put('/notes/:id', notesCtrl.update);
apiRouter.delete('/notes/:id', notesCtrl.remove);

export default apiRouter;
