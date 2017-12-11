export default {
  PoolName: 'STRING_VALUE', /* required */
  AdminCreateUserConfig: {
    AllowAdminCreateUserOnly: true || false,
    InviteMessageTemplate: {
      EmailMessage: 'STRING_VALUE',
      EmailSubject: 'STRING_VALUE',
      SMSMessage: 'STRING_VALUE'
    },
    UnusedAccountValidityDays: 0
  },
  AliasAttributes: [
    phone_number | email | preferred_username,
    /* more items */
  ],
  AutoVerifiedAttributes: [
    phone_number | email,
    /* more items */
  ],
  DeviceConfiguration: {
    ChallengeRequiredOnNewDevice: true || false,
    DeviceOnlyRememberedOnUserPrompt: true || false
  },
  EmailConfiguration: {
    ReplyToEmailAddress: 'STRING_VALUE',
    SourceArn: 'STRING_VALUE'
  },
  EmailVerificationMessage: 'STRING_VALUE',
  EmailVerificationSubject: 'STRING_VALUE',
  LambdaConfig: {
    CreateAuthChallenge: 'STRING_VALUE',
    CustomMessage: 'STRING_VALUE',
    DefineAuthChallenge: 'STRING_VALUE',
    PostAuthentication: 'STRING_VALUE',
    PostConfirmation: 'STRING_VALUE',
    PreAuthentication: 'STRING_VALUE',
    PreSignUp: 'STRING_VALUE',
    PreTokenGeneration: 'STRING_VALUE',
    VerifyAuthChallengeResponse: 'STRING_VALUE'
  },
  MfaConfiguration: OFF | ON | OPTIONAL,
  Policies: {
    PasswordPolicy: {
      MinimumLength: 0,
      RequireLowercase: true || false,
      RequireNumbers: true || false,
      RequireSymbols: true || false,
      RequireUppercase: true || false
    }
  },
  Schema: [
    {
      AttributeDataType: String | Number | DateTime | Boolean,
      DeveloperOnlyAttribute: true || false,
      Mutable: true || false,
      Name: 'STRING_VALUE',
      NumberAttributeConstraints: {
        MaxValue: 'STRING_VALUE',
        MinValue: 'STRING_VALUE'
      },
      Required: true || false,
      StringAttributeConstraints: {
        MaxLength: 'STRING_VALUE',
        MinLength: 'STRING_VALUE'
      }
    },
    /* more items */
  ],
  SmsAuthenticationMessage: 'STRING_VALUE',
  SmsConfiguration: {
    SnsCallerArn: 'STRING_VALUE', /* required */
    ExternalId: 'STRING_VALUE'
  },
  SmsVerificationMessage: 'STRING_VALUE',
  UserPoolAddOns: {
    AdvancedSecurityMode: OFF | AUDIT | ENFORCED /* required */
  },
  UserPoolTags: {
    '<StringType>': 'STRING_VALUE',
    /* '<StringType>': ... */
  },
  UsernameAttributes: [
    phone_number | email,
    /* more items */
  ],
  VerificationMessageTemplate: {
    DefaultEmailOption: CONFIRM_WITH_LINK | CONFIRM_WITH_CODE,
    EmailMessage: 'STRING_VALUE',
    EmailMessageByLink: 'STRING_VALUE',
    EmailSubject: 'STRING_VALUE',
    EmailSubjectByLink: 'STRING_VALUE',
    SmsMessage: 'STRING_VALUE'
  }
}
