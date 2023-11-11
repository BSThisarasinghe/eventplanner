export interface UserModel {
    displayName: string | null;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
        creationTime: number;
        lastSignInTime: number;
    };
    multiFactor: {
        enrolledFactors: any[]; // You might want to replace 'any' with a more specific type
    };
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: any[];
    providerId: string;
    tenantId: string | null;
    uid: string;
}