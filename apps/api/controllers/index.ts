import { HealthController } from "./health";
import { HomeController } from "./home";
import { NotFoundController } from "./not-found";
import { TaskController } from "./task";

export class Controller {
  public notFound: NotFoundController;
  public health: HealthController;
  public home: HomeController;
  public task: TaskController;

  public constructor() {
    this.notFound = new NotFoundController();
    this.health = new HealthController();
    this.home = new HomeController();
    this.task = new TaskController();
  }
}
