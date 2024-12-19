import streamlit as st
import numpy as np
import pandas as pd
import time

# Title of the Streamlit app
st.title("Real-Time EEG Simulation and State Detection")
st.write("Simulating EEG data from four channels (TP9, AF7, AF8, TP10) in real time, with state classification.")

# Sidebar settings
refresh_rate = st.sidebar.slider("Refresh Rate (in seconds)", 0.05, 1.0, 0.2)
max_points = st.sidebar.slider("Number of Data Points to Display", 50, 200, 100)
st.sidebar.write("Adjust refresh rate and data display window size.")

# Initialize placeholders for real-time updates
chart_placeholder = st.empty()
state_placeholder = st.empty()

# Initialize empty DataFrame for plotting
eeg_df = pd.DataFrame(columns=["Time", "TP9", "AF7", "AF8", "TP10"])

# Generate slower-changing EEG data with less randomness
def generate_eeg_data(last_values, current_state):
    """Simulates EEG signals with reduced fluctuations and more consistent state transitions."""
    # Simulate slow changes in EEG signals
    tp9 = last_values["TP9"] + np.random.uniform(-5, 5)
    af7 = last_values["AF7"] + np.random.uniform(-5, 5)
    af8 = last_values["AF8"] + np.random.uniform(-5, 5)
    tp10 = last_values["TP10"] + np.random.uniform(-5, 5)
    
    # Occasionally, simulate state transitions
    if np.random.randint(0, 100) < 2:  # Low chance for state change
        # Toggle between states in a slow, consistent manner
        if current_state == "Positive":
            current_state = "Neutral"
        elif current_state == "Neutral":
            current_state = "Negative"
        elif current_state == "Negative":
            current_state = "Danger"
        else:
            current_state = "Positive"

    return {"TP9": tp9, "AF7": af7, "AF8": af8, "TP10": tp10}, current_state

# Classify the state based on EEG data
def classify_state(avg_amplitude):
    """Classifies the current state based on the average EEG amplitude."""
    if avg_amplitude > 200:
        return "Positive", "🟢"
    elif avg_amplitude > 0:
        return "Neutral", "🟡"
    elif avg_amplitude > -350:
        return "Negative", "🟠"
    else:
        return "Danger", "🔴"

# Initialize the last known values for EEG signals and the initial state
last_values = {"TP9": 0, "AF7": 0, "AF8": 0, "TP10": 0}
current_state = "Neutral"  # Start with a neutral state

# Streamlit real-time loop
while True:
    # Generate new EEG data with reduced randomness
    new_data, current_state = generate_eeg_data(last_values, current_state)
    current_time = time.time()
    new_data["Time"] = current_time

    # Add the new data to the DataFrame
    new_row = pd.DataFrame([new_data])
    eeg_df = pd.concat([eeg_df, new_row]).tail(max_points)

    # Compute the average amplitude for classification
    avg_amplitude = np.mean([new_data["TP9"], new_data["AF7"], new_data["AF8"], new_data["TP10"]])
    current_state_label, emoji = classify_state(avg_amplitude)

    # Display the current state
    state_placeholder.write(f"### Current State: {current_state_label} {emoji}")

    # Plot the real-time EEG signals using Streamlit's line_chart
    chart_placeholder.line_chart(
        eeg_df.set_index("Time")[["TP9", "AF7", "AF8", "TP10"]]
    )

    # Update the last known values
    last_values = new_data

    # Wait for the refresh rate
    time.sleep(refresh_rate)
