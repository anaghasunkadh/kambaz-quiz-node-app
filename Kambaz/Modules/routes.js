//import * as modulesDao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function ModuleRoutes(app) {
  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);

    if (status.acknowledged && status.modifiedCount === 1) {
      res.sendStatus(204); // Successfully updated, no content
    } else {
      res.sendStatus(404); // Not found or not updated
    }
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });
}
