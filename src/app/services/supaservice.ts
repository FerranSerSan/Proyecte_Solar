import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Iplanta } from "../plantes/iplanta";
import { inject, Injectable, resource, signal } from "@angular/core";
import { debounceTime, distinctUntilChanged, from, Observable, interval, map, BehaviorSubject } from "rxjs";
import { AuthChangeEvent, createClient, Session, SupabaseClient } from "@supabase/supabase-js";
import { Registre } from "../plantes/registre";


@Injectable({
  providedIn: 'root',
})
export class Supaservice {
  private http = inject(HttpClient);

  private supabase: SupabaseClient;

  plantesSubject = new BehaviorSubject<Iplanta[]>([]);
  plantesSearchSignal = signal('');

  setSearchString(searchString: string) {
    this.subjectSearchString.next(searchString);
  }

  subjectSearchString = new BehaviorSubject('');

  loggedSubject = new BehaviorSubject<Session | null>(null);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.authChangesObservable().subscribe((session) => {
      this.loggedSubject.next(session.session);
    });
    this.subjectSearchString
    .pipe(
      map(s => Boolean(s) ? s : ''),
      debounceTime(500),
      distinctUntilChanged(),
      map(s => s.toLowerCase())
    )
    .subscribe(async (searchString) => {
      const plantes = await this.searchPlantesSupabase(searchString);
      this.plantesSubject.next(plantes);
      //console.log(plantes);
    });
  }

  async getPlantesSupabase() {
    const {data, error } = await this.supabase
    .from("plantes")
    .select("*");
    if (error) {
      console.error("Error fetching plantes:", error);
      throw error;
    }
    return data;
  }

  async searchPlantesSupabase(searchString: string): Promise<Iplanta[]> {
    const {data, error } = await this.supabase
    .from("plantes")
    .select("*")
    .ilike("nom", `%${searchString}%`);
    if (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
    return data;
  }

  getPlantesObservable(): Observable<Iplanta[]> {
    return from(this.getPlantesSupabase());
  }

  getEcho(data: string) {
    return data;
  }

  getIplantes(): Observable<Iplanta[]> {
    const resultat = this.http.get<Iplanta[]>(environment.supabaseUrl+"/rest/v1/plantes?select=*", {
        headers: new HttpHeaders({
            apikey: environment.supabaseKey,
            Authorization: `Bearer ${environment.supabaseKey}`
        })
    });
    return resultat;
  }

  async getIplantesById(id: number) {
    const {data, error } = await this.supabase
    .from("plantes").select("*").eq("id", id).single();
    if (error) {
      console.error("Error fetching plantes:", error);
      throw error;
    }
    return data;
  }

  async login(loginData: {email: string, password: string}) {
    let { data, error } = await this.supabase.auth.signInWithPassword(loginData);
    if (error) {
      console.error("Login error:", error);
      throw error;
    }
    return data;
  }

  async register(loginData: {email: string, password: string}) {
    let { data, error } = await this.supabase.auth.signUp(loginData);
    if (error) {
      console.error("Registration error:", error);
      throw error;
    }
    return data;
  }

  plantesResource = resource({
    params:()=>({params: this.plantesSearchSignal()}),
    loader: async({params})=> {
      return await this.searchPlantesSupabase(params.params);
    }
  })

  authChanges(callback: (event: AuthChangeEvent,
  session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
  
  authChangesObservable(): Observable<{ event:AuthChangeEvent; session: Session | null }> {
    return new Observable((susbscriber) => {
      const { data: authListener } = this.authChanges(
        (event: AuthChangeEvent, session: Session | null) => {
          susbscriber.next({ event, session });
        },
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    });
  }

  async logout() {
    let { error } = await this.supabase.auth.signOut();
  }

  observableTimeRxJS = interval(1000);

  async getRegistresSupabase(plantaId: number): Promise<Registre[]> {
    const {data, error } = await this.supabase
    .from("registres")
    .select("*")
    .eq("planta", plantaId)
    .limit(288)
    .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
    return data;
  }
}

