import idTransformator from "../enums/id-to-code-list";

export default {
   isFull(container) {
        return container.values.status[0] == "2";
   }
}
