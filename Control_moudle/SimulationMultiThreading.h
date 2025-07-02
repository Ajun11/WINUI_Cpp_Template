#pragma once

#include "SimulationMultiThreading.g.h"

namespace winrt::ControlSystem::implementation
{
    struct SimulationMultiThreading : SimulationMultiThreadingT<SimulationMultiThreading>
    {
        SimulationMultiThreading() = default;
        static std::atomic<bool> is_running; // 控制线程循环的标志
        static void ControlSimulation(const float& sample_time, const float& reference_vel, const Microsoft::UI::Xaml::Controls::WebView2& m_webview);
    };
}

namespace winrt::ControlSystem::factory_implementation
{
    struct SimulationMultiThreading : SimulationMultiThreadingT<SimulationMultiThreading, implementation::SimulationMultiThreading>
    {
    };
}
