export declare class PricingService {
    static findAll(): Promise<({
        features: {
            id: string;
            createdAt: Date;
            feature: string;
            pricingPlanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        price: number;
        period: string;
        maxEmployees: number;
        description: string | null;
        popular: boolean;
        active: boolean;
    })[]>;
    static findById(id: string): Promise<({
        features: {
            id: string;
            createdAt: Date;
            feature: string;
            pricingPlanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        price: number;
        period: string;
        maxEmployees: number;
        description: string | null;
        popular: boolean;
        active: boolean;
    }) | null>;
    static create(data: {
        name: string;
        price: number;
        currency?: string;
        period?: string;
        maxEmployees: number;
        description?: string;
        features: string[];
        popular?: boolean;
        active?: boolean;
    }): Promise<{
        features: {
            id: string;
            createdAt: Date;
            feature: string;
            pricingPlanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        price: number;
        period: string;
        maxEmployees: number;
        description: string | null;
        popular: boolean;
        active: boolean;
    }>;
    static update(id: string, data: {
        name?: string;
        price?: number;
        currency?: string;
        period?: string;
        maxEmployees?: number;
        description?: string;
        features?: string[];
        popular?: boolean;
        active?: boolean;
    }): Promise<{
        features: {
            id: string;
            createdAt: Date;
            feature: string;
            pricingPlanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        price: number;
        period: string;
        maxEmployees: number;
        description: string | null;
        popular: boolean;
        active: boolean;
    }>;
    static delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        price: number;
        period: string;
        maxEmployees: number;
        description: string | null;
        popular: boolean;
        active: boolean;
    }>;
    static toggleActive(id: string): Promise<{
        features: {
            id: string;
            createdAt: Date;
            feature: string;
            pricingPlanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        price: number;
        period: string;
        maxEmployees: number;
        description: string | null;
        popular: boolean;
        active: boolean;
    }>;
    static findActive(): Promise<({
        features: {
            id: string;
            createdAt: Date;
            feature: string;
            pricingPlanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        price: number;
        period: string;
        maxEmployees: number;
        description: string | null;
        popular: boolean;
        active: boolean;
    })[]>;
    static findPopular(): Promise<({
        features: {
            id: string;
            createdAt: Date;
            feature: string;
            pricingPlanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        currency: string;
        price: number;
        period: string;
        maxEmployees: number;
        description: string | null;
        popular: boolean;
        active: boolean;
    }) | null>;
}
//# sourceMappingURL=pricing.service.d.ts.map