import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {
  inputData: { cost: number; serviceQuality: string; roundUp: boolean };
  serviceQualityLabel!: string;
  tip!: number;
  total!: number;

  constructor(private router: Router) {
    this.inputData = this.router.getCurrentNavigation()?.extras.state as { cost: number; serviceQuality: string; roundUp: boolean };
    this.calculateTipAndTotal();
  }

  private calculateTipAndTotal() {
    const serviceQuality = parseFloat(this.inputData.serviceQuality);
    this.tip = this.inputData.cost * serviceQuality;
    if (this.inputData.roundUp) {
      this.tip = Math.ceil(this.tip);
    } else {
      this.tip = Math.round(this.tip * 100) / 100;
    }
    this.total = this.inputData.cost + this.tip;
    this.serviceQualityLabel = this.getServiceQualityLabel(serviceQuality);
  }

  private getServiceQualityLabel(serviceQuality: number): string {
    switch (serviceQuality) {
      case 0.15:
        return 'Okey (15%)';
      case 0.18:
        return 'Good (18%)';
      case 0.20:
        return 'Excellent (20%)';
      default:
        return 'Unknown';
    }
  }
}
