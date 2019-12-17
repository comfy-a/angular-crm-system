import { Component, OnInit, ElementRef, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

declare const daum: any;
const URL = "http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false";

@Component({
  selector: 'app-daum-address',
  template: `<button mat-raised-button color="primary" class="last" (click)="openDaumApi()">{{zipNo}}</button>`,
  styles: [`
    button { width: 100%; }
  `]
})
export class DaumAddressComponent implements OnInit, OnChanges {

  @Output() result = new EventEmitter<any>();
  @Input() zipNo: string;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.loadDaumApi();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.zipNo) {
      if (changes.zipNo.currentValue) {
        this.zipNo = changes.zipNo.currentValue;
      } else {
        this.zipNo = '우편번호';
      }
    }
  }

  openDaumApi() {
    daum.postcode.load(() => {
      new daum.Postcode({
        oncomplete: (data) => {
          this.daumApiCallback(data);
        }
      }).open();
    });
  }

  loadDaumApi() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = URL;
      script.type = 'text/javascript';
      script.async = true;
      this.el.nativeElement.appendChild(script);
      resolve(true);
    });
  }

  daumApiCallback(data) {
    let zipCode = '';
    let fullAddr = '';
    let extraAddr = '';

    if (data.userSelectedType === 'R') {
      fullAddr = data.roadAddress;
      zipCode = data.zonecode;

      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
      }
      fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
    } else {
      zipCode = data.zonecode;
      fullAddr = data.jibunAddress;
    }

    this.result.emit({
      zipNo: zipCode,
      baseAddr: fullAddr
    });
  }

}
