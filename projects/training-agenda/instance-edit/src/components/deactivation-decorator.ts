export abstract class DeactivationDecorator {
    private canDeactivateState = true;

    setCanDeactivate($event: boolean) {
        this.canDeactivateState = $event;
    }

    canDeactivate() {
        return this.canDeactivateState;
    }
}
