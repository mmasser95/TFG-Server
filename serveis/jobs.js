const cron = require('node-cron');
const FirebaseService = require('./firebase');
const RebostService = require('./rebosts');
function initJobs() {
  const scheduledJobFunction = cron.schedule('0 0 18,20,22,23 * * *', async () => {
    console.log("I'm executed on a schedule!");
    let usuaris = await RebostService.getAllUsuarisAmbAlgunElementCaducat();
    if (!usuaris) console.log('No hi ha usuaris');
    console.log(usuaris)
    usuaris[0].forEach((el) => {
        console.log(el)
      FirebaseService.sendMessageToUser(
        el,
        'client',
        'Elements caducats',
        'Tens elements caducats en el teu rebost'
      );
    });
    usuaris[1].forEach((el) => {
      FirebaseService.sendMessageToUser(
        el,
        'establiment',
        'Elements caducats',
        'Tens elements caducats en el teu rebost'
      );
    });
    // Add your custom logic here
  });
  scheduledJobFunction.start();
}
module.exports = { initJobs };
