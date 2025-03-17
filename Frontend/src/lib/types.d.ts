/**
 * This module defines the type interfaces used for managing distance-related operations.
 *
 * - DistanceRequest:
 *   Represents a request containing the source and destination locations.
 *
 * - DistanceResponse:
 *   Represents a response containing the calculated distance between two locations,
 *   provided in both miles and kilometers.
 *
 * - PreviousQuery:
 *   Represents the structure for logging previous distance queries, including source and destination
 *   addresses, calculated distances in both miles and km, and the timestamp of when the query was made.
 */

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