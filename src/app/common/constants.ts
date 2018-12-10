export enum ViewMode {
	addMode = 1,
	editMode
}

export enum promocode_valuetype {
	flat = 1,
	percentage
}

export enum SP_STATUS {
	Pending = 1,
	Active,
	Inactive,
	Blocked,
	Suspended,
	PreOrientation,
	Rookie
}

export enum SP_Availability {
	Online = 1,
	Working,
	Standby,
	Offline
}

export const tracking_refresh_time: number = 60;
export const page_size: number = 25;
export const default_vehicle_url: string = "https://s3-us-west-2.amazonaws.com/pickup-sp/Coming-soon-placeholder-under-wraps-truck.jpg";
export const default_sp_profile_url: string = "https://s3-us-west-2.amazonaws.com/pickup-sp/Coming-soon-placeholder-under-wraps-truck.jpg";

export const marker_icon_url:string = '../../../assets/images/map_marker.svg';
export const icon_url_sp:string = '../../../assets/images/serviceprovider_icon.svg';

/* ORDER RELATED CONSTANTS */
export enum OrderSource {
	ios = 1,
	android,
	web,
	admin
}
export enum OrderScheduleType {
	instant=1,
	scheduled
}
export enum RunType{
	pickup =1,
	delivery
}

export enum OrderStatus{
	Created,
	PendingReview,
	Errored,
	Quoted,
	Scheduled,
	InProgress,
	Complete,
	Canceled,
	Dispatched,//TODO: Need to remove once server removes
	Paid, //TODO: Need to remove once server removes
	PendingDispatch,
	PendingScheduling
}

export enum RunStatus {
	Unassigned,
	Dispatching,
	Assigned,
	InProgress,
	Completed,
	DispatchFailed,
	Canceled,
	Transferred
}

export enum TrackingOrders{
	urgent = 0,
	inprogress,
	scheduled
}
