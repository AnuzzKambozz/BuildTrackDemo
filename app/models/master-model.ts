import { ExceptionMdl } from "./common";

export interface MasterModel {
    success: boolean;
    message: string;
    data:    Data;
    exception: ExceptionMdl;

}

export interface Data {
    industries:         MasterItem[];
    country_codes:      MasterItem[];
    countries:          MasterItem[];
    company_sizes:      MasterItem[];
    subscription_plans: SubscriptionProductModel[];
    onboarding_stages:  OnboardingStage[];
    departments:        MasterItem[];
    user_status:        MasterItem[];
}

export interface MasterItem {
    id:   string;
    name: string;
}

export interface OnboardingStage {
    id:       string;
    name:     string;
    sequence: number; 
}

export interface SubscriptionProductModel {
    id:       string;
    name:     string;
    price:    number; 
    description:  string;
}


export interface SingleMasterModel {
    success: boolean;
    message: string;
    data:     MasterItem[];
    exception: ExceptionMdl;

}