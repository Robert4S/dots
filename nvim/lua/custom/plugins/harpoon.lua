return {
  'ThePrimeagen/harpoon',
  branch = 'harpoon2',
  dependencies = { 'nvim-lua/plenary.nvim' },
  config = function()
    local harpoon = require 'harpoon'
    vim.keymap.set('n', '<leader>ha', function()
      harpoon:list():add()
    end, { desc = 'Harpoon point add' })
    vim.keymap.set('n', '<leader>hh', function()
      harpoon.ui:toggle_quick_menu(harpoon:list())
    end, { desc = 'Harpoon menu' })

    vim.keymap.set('n', '<leader>h1', function()
      harpoon:list():select(1)
    end, { desc = 'Harpoon 1' })
    vim.keymap.set('n', '<leader>h2', function()
      harpoon:list():select(2)
    end, { desc = 'Harpoon 2' })
    vim.keymap.set('n', '<leader>h3', function()
      harpoon:list():select(3)
    end, { desc = 'Harpoon 3' })
    vim.keymap.set('n', '<leader>h4', function()
      harpoon:list():select(4)
    end, { desc = 'Harpoon 4' })
    vim.keymap.set('n', '<leader>hp', function()
      harpoon:list():prev()
    end, { desc = 'Harpoon previous buffer' })
    vim.keymap.set('n', '<leader>hn', function()
      harpoon:list():next()
    end, { desc = 'Harpoon next buffer' })
  end,
}
