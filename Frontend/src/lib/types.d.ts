interface DistanceRequest {
    source: string;
    destination: string;
}

interface DistanceResponse {
    distance: {
        miles: number;
        km: number;
    };
}
interface PreviousQuery {
    source_address: any;
    destination_address: any;
    distance_miles: number;
    distance_km: number;
    created_at: string;
}
export { PreviousQuery, DistanceRequest, DistanceResponse}