return {
  'AlexvZyl/nordic.nvim',
  lazy = false,
  priority = 1000,
  config = function()
    require('nordic').setup {
      transparent = {
        -- Enable transparent background.
        bg = true,
        -- Enable transparent background for floating windows.
        float = true,
      },
    }
    require('nordic').load()
  end,
}
