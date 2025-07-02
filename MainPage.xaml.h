#pragma once

#include "MainPage.g.h"

namespace winrt::ControlSystem::implementation
{
    struct MainPage : MainPageT<MainPage>
    {
        MainPage();
        void NavView_Navigate(Windows::UI::Xaml::Interop::TypeName navPageType,
            Microsoft::UI::Xaml::Media::Animation::NavigationTransitionInfo const& transitionInfo);
        void nvsample1_ItemInvoked(winrt::Microsoft::UI::Xaml::Controls::NavigationView const& sender, winrt::Microsoft::UI::Xaml::Controls::NavigationViewItemInvokedEventArgs const& args);
        void nvsample1_Loaded(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e);
        static inline winrt::Microsoft::UI::Xaml::Controls::NavigationView root_page_navView{ nullptr };
    };
}

namespace winrt::ControlSystem::factory_implementation
{
    struct MainPage : MainPageT<MainPage, implementation::MainPage>
    {
    };
}
