import dayjs from "dayjs";
import isSameorAfter from "dayjs/plugin/isSameorAfter";
import "dayjs/locale/es";

dayjs.locale("es");
dayjs.extend(isSameorAfter);

export default dayjs;
