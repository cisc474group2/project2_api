export class EventsModel{
    event_id='';
    title='';
    bus_id='';
    description?='';
    registered_ind:string[]=[];
    event_geoloc='';
    event_address='';
    start_time='';
    end_time='';

    static fromObject(object:any):EventsModel{
        const e:EventsModel=new EventsModel();
        e.event_id=object.event_id;
        e.title=object.title;
        e.bus_id=object.bus_id;
        e.description=object.description;
        e.registered_ind=object.registered_ind;
        e.event_geoloc=object.event_geoloc;
        e.event_address=object.event_address;
        e.start_time=object.start_time;
        e.end_time=object.end_time;
        return e;
    }
    toObject():any{
        return {event_id:this.event_id,title:this.title,bus_id:this.bus_id,description:this.description,registered_ind:this.registered_ind,event_geoloc:this.event_geoloc,event_address:this.event_address,start_time:this.start_time,end_time:this.end_time};
    }
}