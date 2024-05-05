import { Component, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  EMPTY_TYPE,
  Type,
  CampaignCategory,
  EMPTY_CAMPAIGN_CATEGORY,
  Campaign,
} from 'src/app/model/campaign.model';
import { UtilsService } from 'src/app/core/utils.service';
import { EventEmitter } from '@angular/core';
import { EMPTY_USER, User } from 'src/app/model/user.model';

@Component({
  selector: 'app-new-campaign-form',
  templateUrl: './new-campaign-form.component.html',
  styleUrls: ['./new-campaign-form.component.scss'],
})
export class NewCampaignFormComponent {
  newCampaignForm: FormGroup;

  @Output() createCampaign: EventEmitter<Campaign> =
    new EventEmitter<Campaign>();

  @Input() types: Type[] = [];
  @Input() categories: CampaignCategory[] = [];
  @Input() user: User = EMPTY_USER;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilsService
  ) {
    this.newCampaignForm = this.formBuilder.group({
      id: [99],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      financialAim: [0, [Validators.required, Validators.pattern('[0-9]+')]],
      user: [this.user],
      image: ['/path/to/image'],
      totalRaised: [0],
      punctuation: [0],
    });
  }

  showError(controlName: string): boolean {
    return this.utilService.showError(
      controlName,
      this.newCampaignForm.controls
    );
  }

  getErrorMessage(controlName: string): string {
    return this.utilService.getErrorMessage(
      controlName,
      this.newCampaignForm.controls
    );
  }

  onCreateCampaign() {
    this.newCampaignForm.controls['user'].reset(this.user);

    this.createCampaign.emit(this.newCampaignForm.value);
  }
}
