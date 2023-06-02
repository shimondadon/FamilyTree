import { Injectable, TemplateRef } from '@angular/core';

/**
 * Show toast on the page with the input message and type 
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: any[] = [];

	/**
	 * show success toast for 5 seconds with background color
	 * @param textOrTpl the text to show
	 */
	success(textOrTpl: string | TemplateRef<any>){
		this.show(textOrTpl,{ classname: 'bg-success text-light', delay: 5000 })
	}

	/**
	 * show error toast for 5 seconds with background color
	 * @param textOrTpl the text to show
	 */
	error(dangerTpl: string) {
		this.show(dangerTpl, { classname: 'bg-danger text-light', delay: 5000 });
	}


	/**
	 * add the toast to the list of ngb-toast component
	 * @param textOrTpl the text to show 
	 * @param options the option color and timeout
	 */
	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}

	/**
	 * 
	 * @param toast remove the toast from the list of ngb-toast
	 */
	remove(toast:any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}