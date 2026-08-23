export interface BiharUntoldArtFormOption {
  id: string;
  name: string;
  category: string;
}

export interface BiharUntoldOptions {
  artForms: BiharUntoldArtFormOption[];
  districts: string[];
  engagementPreferences: string[];
  assistancePreferences: string[];
}

export type ExperienceRange = '1_to_2' | '3_to_5' | '6_to_10' | 'more_than_10';
export type YesNoMaybe = 'yes' | 'no' | 'maybe';
export type WhatsappPortfolioStatus = 'sent' | 'not_yet';
export type BiharUntoldStatus = 'draft' | 'submitted';

export interface CreateBiharUntoldSubmissionInput {
  email: string;
  fullName: string;
  /** YYYY-MM-DD */
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  aadhaarNumber: string;
  parentName: string;
  parentContactNumber: string;
  district: string;
}

export interface BiharUntoldSubmissionRef {
  id: string;
  editToken: string;
  status: BiharUntoldStatus;
  currentStep: number;
}

export interface BiharUntoldStepResult {
  id: string;
  status: BiharUntoldStatus;
  currentStep: number;
}

export interface BiharUntoldPortfolioFile {
  id: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
}

export interface BiharUntoldExperienceInput {
  experienceRange: ExperienceRange;
  formalTraining: boolean;
  earnsLivelihood: boolean;
  hasCertification: boolean;
  hasRecognition: boolean;
}

export interface BiharUntoldEngagementInput {
  engagementPreferences: string[];
  assistancePreferences: string[];
}

export interface BiharUntoldVisionsInput {
  interestedInSelling: YesNoMaybe;
  promotionIdeas?: string;
  suggestions?: string;
  wantsToJoin: YesNoMaybe;
}

export interface BiharUntoldSubmission {
  id: string;
  status: BiharUntoldStatus;
  currentStep: number;
  particulars: {
    email: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    mobileNumber: string;
    /** Masked by the API for anything but the owner's own creation response, e.g. "********9012". */
    aadhaarNumber: string;
    parentName: string;
    parentContactNumber: string;
    district: string;
  };
  artForms: string[];
  otherArtForm: string | null;
  experience: {
    range: ExperienceRange | null;
    formalTraining: boolean | null;
    earnsLivelihood: boolean | null;
    hasCertification: boolean | null;
    hasRecognition: boolean | null;
  };
  portfolioFiles: BiharUntoldPortfolioFile[];
  whatsappPortfolioStatus: WhatsappPortfolioStatus | null;
  engagementPreferences: string[];
  assistancePreferences: string[];
  interestedInSelling: YesNoMaybe | null;
  promotionIdeas: string | null;
  suggestions: string | null;
  wantsToJoin: YesNoMaybe | null;
  submittedAt: string | null;
}

export interface BiharUntoldSubmitResult {
  id: string;
  status: 'submitted';
  submittedAt: string;
}

export interface BiharUntoldService {
  /** GET /v1/bihar-untold/options — art forms, districts, engagement/assistance catalogues. Public. */
  getOptions(): Promise<BiharUntoldOptions>;
  /** POST /v1/bihar-untold/submissions — starts a draft, returns the editToken used as X-Submission-Token for every subsequent call. */
  createSubmission(input: CreateBiharUntoldSubmissionInput): Promise<BiharUntoldSubmissionRef>;
  getSubmission(id: string, editToken: string): Promise<BiharUntoldSubmission>;
  saveArtForms(id: string, editToken: string, artForms: string[], otherArtForm?: string): Promise<BiharUntoldStepResult>;
  saveExperience(id: string, editToken: string, input: BiharUntoldExperienceInput): Promise<BiharUntoldStepResult>;
  saveCreations(id: string, editToken: string, whatsappPortfolioStatus?: WhatsappPortfolioStatus): Promise<BiharUntoldStepResult>;
  /** PUT .../portfolio-files — raw file bytes; only JPG/PNG/MP4/PDF accepted server-side. */
  uploadPortfolioFile(id: string, editToken: string, file: File): Promise<BiharUntoldPortfolioFile>;
  saveEngagement(id: string, editToken: string, input: BiharUntoldEngagementInput): Promise<BiharUntoldStepResult>;
  saveVisions(id: string, editToken: string, input: BiharUntoldVisionsInput): Promise<BiharUntoldStepResult>;
  submit(id: string, editToken: string): Promise<BiharUntoldSubmitResult>;
}
