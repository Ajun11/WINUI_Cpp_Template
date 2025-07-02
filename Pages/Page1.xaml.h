#pragma once

#include "Page1.g.h"
#include "MainPage.xaml.h"
namespace winrt::ControlSystem::implementation
{
    struct Page1 : Page1T<Page1>
    {
        Page1();
        friend struct winrt::ControlSystem::implementation::MainPage;
        void FirstPage_Simulation_ParameterSet_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e);
        void FirstPage_SimulationMode_FixedTime_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e);
        void FirstPage_SimulationModeSelectRealTime_Button_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e);
        void FirstPage_ToPage3_Button_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e);
    };
}

namespace winrt::ControlSystem::factory_implementation
{
    struct Page1 : Page1T<Page1, implementation::Page1>
    {
    };
}
