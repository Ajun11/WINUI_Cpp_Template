﻿
//------------------------------------------------------------------------------
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//------------------------------------------------------------------------------
#pragma once

#include <unknwn.h>

// Undefine GetCurrentTime macro to prevent
// conflict with Storyboard::GetCurrentTime
#undef GetCurrentTime

#if __has_include(<winrt/Microsoft.UI.Xaml.Controls.h>)
#include <winrt/Microsoft.UI.Xaml.Controls.h>
#endif
#if __has_include(<winrt/Microsoft.UI.Xaml.Markup.h>)
#include <winrt/Microsoft.UI.Xaml.Markup.h>
#endif


namespace winrt::ControlSystem::implementation
{
    using IInspectable = ::winrt::Windows::Foundation::IInspectable;

    template <typename D, typename ... I>
    struct MainWindowT : public ::winrt::ControlSystem::implementation::MainWindow_base<D,
        ::winrt::Microsoft::UI::Xaml::Markup::IComponentConnector,
        I...>
    {
        using base_type = typename MainWindowT::base_type;
        using base_type::base_type;
        using class_type = typename MainWindowT::class_type;

        void InitializeComponent();
        virtual void Connect(int32_t connectionId, IInspectable const& target);
        virtual ::winrt::Microsoft::UI::Xaml::Markup::IComponentConnector GetBindingConnector(int32_t connectionId, IInspectable const& target);
        void UnloadObject(::winrt::Microsoft::UI::Xaml::DependencyObject const& dependencyObject);
        void DisconnectUnloadedObject(int32_t connectionId);

        ::winrt::Microsoft::UI::Xaml::Controls::Grid AppTitleBar()
        {
            return _AppTitleBar;
        }
        void AppTitleBar(::winrt::Microsoft::UI::Xaml::Controls::Grid value)
        {
            _AppTitleBar = value;
        }

        ::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition LeftPaddingColumn()
        {
            return _LeftPaddingColumn;
        }
        void LeftPaddingColumn(::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition value)
        {
            _LeftPaddingColumn = value;
        }

        ::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition IconColumn()
        {
            return _IconColumn;
        }
        void IconColumn(::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition value)
        {
            _IconColumn = value;
        }

        ::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition TitleColumn()
        {
            return _TitleColumn;
        }
        void TitleColumn(::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition value)
        {
            _TitleColumn = value;
        }

        ::winrt::Microsoft::UI::Xaml::Controls::Image TitleBarIcon()
        {
            return _TitleBarIcon;
        }
        void TitleBarIcon(::winrt::Microsoft::UI::Xaml::Controls::Image value)
        {
            _TitleBarIcon = value;
        }

        ::winrt::Microsoft::UI::Xaml::Controls::TextBlock TitleBarTextBlock()
        {
            return _TitleBarTextBlock;
        }
        void TitleBarTextBlock(::winrt::Microsoft::UI::Xaml::Controls::TextBlock value)
        {
            _TitleBarTextBlock = value;
        }
        
    protected:
        bool _contentLoaded{false};

    private:
        struct MainWindow_obj1_Bindings;

        ::winrt::Microsoft::UI::Xaml::Controls::Grid _AppTitleBar{nullptr};
        ::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition _LeftPaddingColumn{nullptr};
        ::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition _IconColumn{nullptr};
        ::winrt::Microsoft::UI::Xaml::Controls::ColumnDefinition _TitleColumn{nullptr};
        ::winrt::Microsoft::UI::Xaml::Controls::Image _TitleBarIcon{nullptr};
        ::winrt::Microsoft::UI::Xaml::Controls::TextBlock _TitleBarTextBlock{nullptr};
    };
}

