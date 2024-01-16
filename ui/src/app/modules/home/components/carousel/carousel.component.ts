import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Banners } from 'src/app/modules/home/models/Banners';


@Component({
  selector: 'app-carousel-banner',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  currWinSize: any = window.innerWidth;
  isMobile: boolean = this.currWinSize < 768;
  constructor(private config: NgbCarouselConfig) {
  }
  @Input() caraouselData: Banners[] = [];
  ngOnInit(): void {
    this.config.interval = 10000;
    this.config.wrap = true;
    this.config.keyboard = false;
    this.config.pauseOnHover = true;
    if (this.isMobile) {
      this.config.showNavigationArrows = false;
      this.config.showNavigationIndicators = false;
      this.config.keyboard = true;
      this.config.pauseOnHover = false;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768;
    if (this.isMobile) {
      this.config.showNavigationArrows = false;
      this.config.showNavigationIndicators = false;
      this.config.keyboard = true;
      this.config.pauseOnHover = false;
    }
    else {
      this.config.showNavigationArrows = true;
      this.config.showNavigationIndicators = true;
      this.config.keyboard = false;
      this.config.pauseOnHover = true;
    }
  }

}
