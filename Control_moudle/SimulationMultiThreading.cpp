#include "pch.h"
#include "SimulationMultiThreading.h"
#if __has_include("SimulationMultiThreading.g.cpp")
#include "SimulationMultiThreading.g.cpp"
#include <winrt/Microsoft.Web.WebView2.Core.h>
#include <winrt/Microsoft.UI.Xaml.Controls.h>
#include <winrt/Windows.UI.Xaml.Controls.h>
#include <winrt/Microsoft.UI.Dispatching.h>
#include "Control_moudle\Simulation.h"
#include <chrono>
#include <thread>
#include <iostream>
#include <atomic>
#include <cstdlib>
#endif

namespace winrt::ControlSystem::implementation
{
    std::atomic<bool> SimulationMultiThreading::is_running = false;
	void SimulationMultiThreading::ControlSimulation(const float& sample_time, const float& reference_vel, const Microsoft::UI::Xaml::Controls::WebView2& m_webview)
	{
        //* delta_t is the simulation interval,sample_time is web sampleinterval.
        //* 打包仿真间隔和参考转速
        // 获取 UI 线程的 DispatcherQueue
        auto dispatcher = m_webview.DispatcherQueue();
        hstring important_msg = PackImportantMessage(sample_time);
        dispatcher.TryEnqueue([m_webview, important_msg]() {
            m_webview.ExecuteScriptAsync(important_msg);
            });
        std::vector<float> send_value(2,0);
        int outer_time = 0;
        const std::chrono::duration<double> interval = std::chrono::milliseconds((int)(sample_time*1000)); // 0.5 秒
        std::srand(std::time(0));
        while (is_running)
        {
            auto start = std::chrono::steady_clock::now(); // 记录任务开始时间
            send_value[0] = std::rand()%10;
            hstring hs_send_value = PackVectorMessage(send_value);
            dispatcher.TryEnqueue([m_webview, hs_send_value]() {
                m_webview.ExecuteScriptAsync(hs_send_value);
                });
            auto next = start + interval;
            std::this_thread::sleep_until(next);
        }
       
	}
}
