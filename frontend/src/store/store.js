import { create } from 'zustand';
import { axiosInstance } from '../utils/axiosInstance.util.js';
import toast from 'react-hot-toast';

export const useCensusStore = create((set, get) => ({
  fetchingTable: false,
  fetchingLineChart: false,
  fetchingBarChart: false,
  addingCensus: false,
  tableData: [],
  lineChartData: [],
  barChartData: [], // ✅ New state for bar chart data
  error: null,

  // Fetch table data
  fetchTable: async () => {
    set({ fetchingTable: true, error: null });
    try {
      const response = await axiosInstance.get('/data');
      set({ tableData: response.data.data, fetchingTable: false });
    } catch (error) {
      console.error('Error fetching table data:', error);
      set({ fetchingTable: false, error: error.message });
    }
  },

  // Fetch line chart data
  fetchLineChart: async () => {
    set({ fetchingLineChart: true, error: null });
    try {
      const resTrue = await axiosInstance.get('/counts?is_vaccinated=true');
      const resFalse = await axiosInstance.get('/counts?is_vaccinated=false');

      const vaccinatedMap = new Map();
      const unvaccinatedMap = new Map();

      resTrue.data.data.forEach(item => {
        vaccinatedMap.set(item.age, Number(item.count));
      });

      resFalse.data.data.forEach(item => {
        unvaccinatedMap.set(item.age, Number(item.count));
      });

      const allAges = new Set([...vaccinatedMap.keys(), ...unvaccinatedMap.keys()]);

      const combinedData = Array.from(allAges).map(age => ({
        age,
        vaccinated: vaccinatedMap.get(age) || 0,
        unvaccinated: unvaccinatedMap.get(age) || 0
      }));

      combinedData.sort((a, b) => a.age - b.age);

      set({ fetchingLineChart: false, lineChartData: combinedData });
    } catch (error) {
      console.error('Error fetching line chart data:', error);
      set({ fetchingLineChart: false, error: error.message });
    }
  },

  // Fetch bar chart data
  fetchBarChart: async () => {
    set({ fetchingBarChart: true, error: null });
    try {
      const response = await axiosInstance.get('/results');
      set({ barChartData: response.data.data, fetchingBarChart: false }); 
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      set({ fetchingBarChart: false, error: error.message });
    }
  },


  addCensus: async (data) => {
    set({ addingCensus: true, error: null });
    try {
      const response = await axiosInstance.post('/vote', data);
      set({ addingCensus: false });
      
      await Promise.all([
        get().fetchTable(),
        get().fetchLineChart(),
        get().fetchBarChart()
      ]);
      
      toast.success("Census Added")
    } catch (error) {
      console.error('Error adding census:', error);
      set({ addingCensus: false, error: error.message });
      toast.error(error.message || "Failed");
    }
  },
}));
