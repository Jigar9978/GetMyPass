import cron from 'node-cron';

const scheduleExpiredEventsDeletion = () => {
  cron.schedule('0 * * * *', async () => { // Runs every hour
    try {
      console.log('Running expired events cleanup job...');
      const res = await fetch('/api/delete-expired-events');
      if (!res.ok) {
        throw new Error('Failed to process expired events');
      }
      console.log('Expired events processed successfully.');
    } catch (error) {
      console.error('Error running cron job:', error);
    }
  });
};

export default scheduleExpiredEventsDeletion;
