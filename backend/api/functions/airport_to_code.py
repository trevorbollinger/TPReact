import requests
import os
# from main.api_calls.get_airports import *

def airport_to_code(search_string):
    valid_airports = [
        'ATL', 'LAX', 'ORD', 'DFW', 'DEN', 'JFK', 'SEA', 'SFO', 'LAS', 'MIA',
        'PHX', 'IAH', 'CLT', 'MCO', 'EWR', 'BOS', 'DTW', 'PHL', 'BWI', 'SAN',
        'HNL', 'MSP', 'TPA', 'FLL', 'STL', 'CVG', 'JAX', 'SLC', 'PIT', 'AUS',
        'RIC', 'MKE', 'IND', 'OKC', 'ALB', 'BHM', 'SAV', 'RSW', 'TUS', 'CMH',
        'RDU', 'JAC', 'OAK', 'SNA', 'BOS', 'LGB', 'MEM', 'BIS', 'BOI', 'ORF',
        'GEG', 'IAH', 'SFO', 'LAX', 'DCA', 'FAT', 'SJC', 'PVD', 'MSY', 'BFL',
        'BZN', 'GRR', 'SLC', 'HSV', 'FWA', 'PNS', 'BTR', 'JNU', 'ABQ', 'EUG',
        'GNV', 'BFL', 'LFT', 'COS', 'LMT', 'TYS', 'TLH', 'MLI', 'DSM', 'SBN',
        'SPI', 'RNO', 'AZO', 'SUX', 'FAY', 'BPT', 'MFR', 'MFR', 'LWS', 'SWF',
        'NRT', 'HKG', 'ICN', 'YYZ', 'CDG', 'LHR', 'AMS', 'FRA', 'SYD', 'SIN',
        'YYZ', 'CDG', 'LHR', 'AMS', 'FRA', 'SYD', 'SIN', 'HKG', 'NRT', 'DXB',
        'BOM', 'MUC', 'IST', 'MAD', 'GIG', 'LIM', 'SCL', 'EZE', 'YUL', 'YVR',
        'DUB', 'BCN', 'CPH', 'FCO', 'VIE', 'HEL', 'BRU', 'ZRH', 'WAW', 'PRG',
        'LCA', 'TPE', 'MNL', 'HND', 'BKK', 'SIN', 'KUL', 'CMB', 'MLE', 'DEL',
        'HKT', 'TLV', 'KWI', 'DOH', 'RUH', 'JED', 'CAI', 'ADD', 'JNB', 'CPT',
        'DXB', 'BKK', 'HKG', 'SIN', 'NKG', 'SHA', 'PVG', 'BKK', 'HGH', 'XIY',
        'XIY', 'WUH', 'TSN', 'CGO', 'CKG', 'SYX', 'NNG', 'HAK', 'KMG', 'HGH',
        'URC', 'LHE', 'ISB', 'KHI', 'PEK', 'PVG', 'CSX', 'DLC', 'HAK', 'JIN',
        'NKG', 'TYN', 'TPE', 'KHH', 'MFM', 'KMG', 'GYS', 'JJN', 'SHA', 'XMN',
        'FNC', 'PMI', 'ALC', 'TFS', 'VLC', 'IBZ', 'SVQ', 'LPA', 'MAH', 'TLL',
        'TLS', 'NCE', 'MRS', 'LYS', 'SXB', 'BOD', 'TLN', 'LIL', 'CDG', 'ORY',
        'BVA', 'EGC', 'AJA', 'CFR', 'PUY', 'FSC', 'NTE', 'LHE', 'HAF', 'MRS',
        'AJA', 'BOD', 'MPL', 'CFR', 'TLS', 'FSC', 'LYS', 'MRS', 'NCE', 'LIL',
        'TLS', 'EGC', 'BIQ', 'FSC', 'NTE', 'NCE', 'TLN', 'AJA', 'PSE', 'CDG', 'OMA'
    ]

    # Assign the ICAO code of a valid airport from the returned data
    airport_data = get_airports(search_string)
    if airport_data and isinstance(airport_data, list):
        airport_code = None  # Initialize to None
        for airport in airport_data:
            iata_code = airport.get('iataCode')
            if iata_code in valid_airports:
                airport_code = iata_code
                print(airport_code)
                return airport_code
