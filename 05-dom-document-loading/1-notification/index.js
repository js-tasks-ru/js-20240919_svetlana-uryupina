export default class NotificationMessage {
    static activeNotification;

    element;

    constructor (messageText=success, props={}) {
        this.messageText = messageText;

        this.duration = props.duration || 2000;
        this.type = props.type || 'success';

        this.element = this.createElement();
    }

    createTemplate() {
        return `<div class="notification ${this.type}" style="--value:${this.duration/1000}s">
                    <div class="timer"></div>
                    <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">${this.messageText}</div>
                    </div>
                </div>`
        ;
    }

    createElement() {
        const element = document.createElement('div');
        element.innerHTML = this.createTemplate();
        return element.firstElementChild;
    }

    show(parentElement=document.body) {
        if (NotificationMessage.activeNotification) {
            NotificationMessage.activeNotification.destroy();
        }

        NotificationMessage.activeNotification = this;
        parentElement.append(this.element);

        setTimeout(this.remove.bind(this), this.duration);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    };
}
