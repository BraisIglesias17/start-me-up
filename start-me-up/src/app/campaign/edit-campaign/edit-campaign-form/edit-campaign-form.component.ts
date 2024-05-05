import { Component, Input, Output, OnInit } from '@angular/core';
import {
  Campaign,
  CampaignCategory,
  EMPTY_CAMPAIGN,
  EMPTY_CAMPAIGN_CATEGORY,
  EMPTY_TYPE,
} from 'src/app/model/campaign.model';
import { Type } from 'src/app/model/campaign.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-edit-campaign-form',
  templateUrl: './edit-campaign-form.component.html',
  styleUrls: ['./edit-campaign-form.component.scss'],
})
export class EditCampaignFormComponent implements OnInit {
  @Input() campaign: Campaign = EMPTY_CAMPAIGN;
  @Input() types: Type[] = [];
  @Input() categories: CampaignCategory[] = [];

  @Output() editCampaign: EventEmitter<Campaign> = new EventEmitter<Campaign>();

  editCampaignForm!: FormGroup;
  @Input() selectedType: Type | null = null;
  @Input() selectedCategory: CampaignCategory | null = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editCampaignForm = this.formBuilder.group({
      id: [this.campaign.id],
      title: [this.campaign.title, [Validators.required]],
      description: [this.campaign.description, [Validators.required]],
      type: [this.campaign.type, [Validators.required]],
      category: [this.campaign.category, [Validators.required]],
      startDate: [new Date(this.campaign.startDate), [Validators.required]],
      endDate: [new Date(this.campaign.endDate), [Validators.required]],
      financialAim: [
        this.campaign.financialAim,
        [Validators.required, Validators.pattern('[0-9]+')],
      ],
      user: [this.campaign.user],
      image: [this.campaign.image],
      totalRaised: [this.campaign.totalRaised],
      punctuation: [this.campaign.punctuation],
    });

    //this.editCampaignForm.get('type')?.setValue(this.campaign.type.value);
    this.selectedCategory = this.campaign.category;
    this.selectedType = this.campaign.type;
  }

  public onEditCampaign(): void {
    console.log(this.editCampaignForm.value);
    this.editCampaign.emit(this.editCampaignForm.value);
  }
}
