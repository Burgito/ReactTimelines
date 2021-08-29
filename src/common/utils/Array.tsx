export class ArrayManipulation {
    static reorder<T>(list: Array<T>, startIndex: number, endIndex: number) {
        const [removed] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, removed);
    }

    static move<T>(source: T[], destination: T[], sourceIndex: number, destIndex: number) {
        const [removed] = source.splice(sourceIndex, 1);
        destination.splice(destIndex, 0, removed);
      };
};