module.exports = (db) => {
    const Job = {};
  
    Job.create = async (job) => {
      try {
        const { rows } = await db.query(
          `INSERT INTO jobs (title, description, budget, location, client_id, handyman_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [job.title, job.description, job.budget, job.location, job.client_id, job.handyman_id]
        );
        return rows[0];
      } catch (error) {
        throw error;
      }
    };
  
    // ... other methods for searching, updating, managing job statuses, adding skills, etc.
  
    return Job;
  };
  