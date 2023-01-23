const {
  getTasks,
  getTaskByUser,
  deleteTask,
  getTasksDone,
  getTaskById,
  updateTaskStatus,
  updateTaskById
} = require("../Services/Tasks");
const client = require("../db/config");

module.exports = {
  createTask: async (req, res) => {
    const {user_id, task_name,date,status } = req.body;
    // let errors = validate(req.body);
    
      try {
        client.query(
          `INSERT INTO tasks(user_id,task_name,date,status) VALUES ($1,$2,$3,$4) RETURNING id,user_id,task_name,status,date`,
          [user_id, task_name,date, status],
          (error, results) => {
            if (error) {
              throw error;
            }
            console.log(results.rows[0]);
            res.send({
              id: results.rows[0].id,
              task_name: results.rows[0].task_name,
              date: results.rows[0].date,
              status: results.rows[0].status
            });
          }
        );
      } catch (error) {}
    
  },
  getTaskById: (req, res) => {
    const id = req.params.id;
    getTaskById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getTasks: (req, res) => {
    const id = req.body.id;
    getTasks(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  },
  getTaskByUser: (req, res) => {
    const id = req.params.id;
    console.log(id);
    getTaskByUser(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });

  },
  getTasksDone: (req, res) => {
    const id = req.body.user_id;
    getTasksDone(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.send(results);
    });
  },
  updateTaskStatus: (req, res) => {
    const id = req.params.id;
    const body = {...req.body,id};
   
    
    updateTaskStatus(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error",
        });
      }
    res.send({
      id: results[0].id,
      status: results[0].status
    });
    });
  },
  updateTaskById: (req, res) => {
    const id = req.params.id;
    const body = {...req.body,id};
    updateTaskById(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error",
        });
      }
    res.send({
      id: results[0].id,
      status: results[0].status,
      task_name:results[0].task_name,
      date:results[0].date
    });
    });
  },
  deleteTask: (req, res) => {
    const id = req.params.id;
    const body = {...req.body,id:parseInt(id)};
    deleteTask(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.status(200).json({
        id: results[0].id,
        data: "User Deleted Successfully",
      });
    });
  },
};
