export class Sort {

    private sortOrder = 1;

    private sortCollator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
    })

    constructor() {
        //console.log(['Z', 'a', 'z', 'ä'].sort(new Intl.Collator('de').compare));
        // expected output: ["a", "ä", "z", "Z"]
    }

    public startSort(property, order, type = '') {
        if (order === 'desc') {
            this.sortOrder = -1;
        }
        return (a, b) => {
            return this.sortCollator.compare(a[property], b[property]) * this.sortOrder;
        }
    }

    private sortData(a, b) {
        if (a < b) {
            return -1 * this.sortOrder;
        } else if (a > b) {
            return 1 * this.sortOrder;
        } else {
            return 0 * this.sortOrder;
        }
    }
}