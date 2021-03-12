import { loginController } from './controllers/loginController.mjs';
import { CardContainerController } from './controllers/controller.mjs';
import { cardContainersView } from './views/view.mjs';
import { cardContainers } from './models/card_data.mjs';
import { currentUser } from './models/user_data.mjs';

const initTrelloApp = async () => {
  await loginController.getDataForInit();
  cardContainersView.render(cardContainers);
  CardContainerController.init();
  CardContainerController.initEventHandler();
};

window.addEventListener('DOMContentLoaded', initTrelloApp);
