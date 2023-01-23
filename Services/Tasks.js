const client = require("../db/config");

module.exports = {
  createTask: (data, callback) => {
    console.log(data);
    // client.query(
    //   `INSERT INTO tasks(user_id,task_name,status) VALUES ($1,$2,$3) RETURNING  user_id,task_name,status`,
    //   [user_id, task_name, task_status],
    //   (error, results) => {
    //     if (error) {
    //       throw error;
    //     }
    //     res.send({
    //       id: results.rows[0].id,
    //       task: results.rows[0].task_name,
    //     });
    //     return results;
    //   }
    // );
  },
  getTasks: (id,callBack) => {
    client.query(
      `SELECT id,user_id,task_name,status,date from tasks where user_id = $1`,
      [id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  getTasksDone: (id,callBack) => {
    console.log(id);
    client.query(
      `SELECT * from tasks where user_id = $1 AND status=true`,
      [id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  getTaskByUser: (id, callBack) => {
    client.query(
      `SELECT id,user_id,task_name,status,date  from tasks where user_id = $1`,
      [id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  getTaskById: (id, callBack) => {
    client.query(
      `SELECT id,user_id,task_name,status,date  from tasks where id = $1`,
      [id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  updateTaskStatus: (data, callBack) => {
    client.query(
      `UPDATE tasks set status=$1  where user_id=$2 AND id=$3 RETURNING status,user_id,id`,
      [data.values.status,data.user_id, data.id],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  updateTaskById: (data, callBack) => {
    
    client.query(
      `UPDATE tasks set status=$1,task_name=$2,date=$3 where user_id=$4 AND id=$5 RETURNING *`,
      [data.values.status,data.values.task_name,data.values.date,data.values.user_id, parseInt(data.id)],
      (err, result) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, result.rows);
      }
    );
  },
  deleteTask:(data,callBack)=>{
    client.query(
        `DELETE FROM tasks where id = $1 and user_id=$2 returning id`,
        [data.id,data.user_id],
        (err,result)=>{
            if(err){
                return callBack(err);
            }
            return callBack(null,result.rows)
        }
    )
  }
};
